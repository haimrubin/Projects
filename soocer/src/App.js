import { useCallback, useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import LogInForm from "./components/LogIn/LogInForm";
import Players from "./components/Players/Players";
import PlayingToday from "./components/Players/PlayingToday";
import AddPlayer from "./components/Players/AddPlayer";
import AuthContext from "./components/store/auth-context";
import Teams from "./components/Players/Teams";

function App() {
  const ctx = useContext(AuthContext);
  const [playingFlag, setPlayingFlag] = useState(false);
  const [addFlag, setAddFlag] = useState(false);
  const [chooseFlag, setChooseFlag] = useState(false);

  const [playerList, setPlayerList] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  const fetchPlayers = useCallback(async () => {
    
      const response = await fetch(
        "https://soocer-959bb-default-rtdb.firebaseio.com/players.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong! try to reload the page");
      }


      const data = await response.json();

      const players = [];
      for (const key in data) {
        players.push({
          key: key,
          id: key,
          name: data[key].name,
          level: data[key].level,
          playing: data[key].playing,
          team: data[key].team,
        });
      }

      setPlayerList(players);
      setLoading(false)
    
  }, []);


  useEffect(() => {
    fetchPlayers().catch((error) => {
      setLoading(false)
      setError(error.message);
    })
  }, [fetchPlayers, chooseFlag]);

  if(error){
    return <section className="error">
      <p>{error}, please try to reload the page!</p>
    </section>
  }
  if(loading){
    return <section className="loading">
      <p>Loading....</p>
    </section>
  }


  async function changeTeam(id, color) {
    const playerIndex = playerList.findIndex((item) => item.id === id);
    const player = playerList[playerIndex];

    const url =
      "https://soocer-959bb-default-rtdb.firebaseio.com/players/" +
      id +
      ".json";
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ ...player, team: color }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const teamsHandler = () => {
    setPlayingFlag(false)
    let playingList = playerList.filter((item) => item.playing === true);

    playingList = playingList.sort((a, b) =>
      a.level > b.level ? -1 : b.level > a.level ? 1 : 0
    );
    let playersInTeam;
    if (playingList.length > 15) {
      playersInTeam = 5 - 1;
    } else {
      playersInTeam = 4 - 1;
    }
    const colors = ["red", "blue", "yellow", "white"];

    for (let index = 0; index < playingList.length; index++) {
      changeTeam(playingList[index].id, colors[index % playersInTeam]);
    }
  };

  const showPlaying = () => {
    setPlayingFlag(true);
    setChooseFlag(false)
  };
  const hidePlaying = () => {
    setPlayingFlag(false);
  };

  const showAdd = () => {
    setAddFlag(!addFlag);
  };
  const hideAdd = () => {
    setAddFlag(false);
  };

  const showChoose = () => {
    setChooseFlag(prevChooseFlag => !prevChooseFlag);
  };

  const choose = chooseFlag ? "הסתר" : "הראה"

 

  return (
    <div>
      <header>
        <Header onShow={showPlaying} onAdd={showAdd} onChoose={showChoose} choose= {choose}  />
      </header>
      <main>
        {!ctx.isLoggedIn && <LogInForm></LogInForm>}
        {addFlag && (
          <AddPlayer refresh={fetchPlayers} onHide={hideAdd}></AddPlayer>
        )}
        {ctx.isLoggedIn && (
          <Players refresh={fetchPlayers} players={playerList}></Players>
        )}
        {playingFlag && (
          <PlayingToday
            refresh={fetchPlayers}
            players={playerList}
            onHide={hidePlaying}
            makeTeams={teamsHandler}
          ></PlayingToday>
        )}
        {chooseFlag && (
          <Teams players={playerList} refresh={fetchPlayers}></Teams>
        )}
      </main>
    </div>
  );
}

export default App;
