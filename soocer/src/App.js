import { useContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import LogInForm from "./components/LogIn/LogInForm";
import Players from "./components/Players/Players";
import PlayingToday from "./components/Players/PlayingToday";
import AddPlayer from "./components/Players/AddPlayer";
import Context from "./components/store/context";
import Teams from "./components/Players/Teams";

function App() {
  const ctx = useContext(Context);
  const [playingFlag, setPlayingFlag] = useState(false);
  const [addFlag, setAddFlag] = useState(false);
  const [chooseFlag, setChooseFlag] = useState(false);

  const showPlaying = () => {
    setPlayingFlag(true);
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
    setChooseFlag(true);
    console.log("sadfasd");
  };

  return (
    <div>
      <header>
        <Header onShow={showPlaying} onAdd={showAdd} />
      </header>
      <main>
        {!ctx.isLoggedIn && <LogInForm></LogInForm>}
        {addFlag && <AddPlayer onHide={hideAdd}></AddPlayer>}
        {ctx.isLoggedIn && <Players></Players>}
        {playingFlag && (
          <PlayingToday
            onChoose={showChoose}
            onHide={hidePlaying}
          ></PlayingToday>
        )}
        {chooseFlag && <Teams></Teams>}
      </main>
    </div>
  );
}

export default App;
