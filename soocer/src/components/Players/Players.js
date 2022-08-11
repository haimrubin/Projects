import { useContext } from "react";
import Context from "../store/context";
import Card from "../UI/Card";
import Player from "./Player";


const Players = () => {
  const ctx = useContext(Context);

  const addHandler = (id) => {
    const playerIndex = ctx.notPlaying.findIndex((item) => item.id === id);
    const addPlayer = ctx.notPlaying[playerIndex];

    ctx.addPlayerToday(addPlayer);
  };

  const playerList = (
    <ul>
      {ctx.notPlaying.map((item) => (
        <Player
          act="הוסף לבחירות"
          id={item.id}
          key={item.id}
          name={item.name}
          level={item.level}
          onAdd={addHandler}
          onDelete={ctx.deletePlayer}
        ></Player>
      ))}
    </ul>
  );

  return <Card>{playerList}</Card>;
};

export default Players;
