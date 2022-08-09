import { useContext } from "react";
import AuthContext from "../store/auth-context";
import Card from "../UI/Card";
import Player from "./Player";

const Players = () => {
  const authCtx = useContext(AuthContext);

  const addHandler = (id) => {
    const playerIndex = authCtx.notPlaying.findIndex((item) => item.id === id);
    const addPlayer = authCtx.notPlaying[playerIndex];

    authCtx.addPlayerToday(addPlayer);
  };

  const playerList = (
    <ul>
      {authCtx.notPlaying.map((item) => (
        <Player
          act="הוסף לבחירות"
          id={item.id}
          key={item.id}
          name={item.name}
          level={item.level}
          onAdd={addHandler}
          onDelete={authCtx.deletePlayer}
        ></Player>
      ))}
    </ul>
  );

  return <Card>{playerList}</Card>;
};

export default Players;
