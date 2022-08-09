import { useContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import LogInForm from "./components/LogIn/LogInForm";
import Players from "./components/Players/Players";
import PlayingToday from "./components/Players/PlayingToday";
import AddPlayer from "./components/Players/AddPlayer";
import AuthContext from "./components/store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const [playingFlag, setPlayingFlag] = useState(false);
  const [addFlag, setAddFlag] = useState(false);

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

  return (
    <div>
      <header>
        <Header onShow={showPlaying} onAdd={showAdd} />
      </header>
      <main>
        {!authCtx.isLoggedIn && <LogInForm></LogInForm>}
        {addFlag && <AddPlayer onHide={hideAdd}></AddPlayer>}
        {authCtx.isLoggedIn && <Players></Players>}
        {playingFlag && <PlayingToday onHide={hidePlaying}></PlayingToday>}
      </main>
    </div>
  );
}

export default App;
