import { useContext, useState } from "react";
import Context from "../store/context";
import Modal from "../UI/Modal";
import Player from "./Player";
import classes from "./PlayingToday.module.css";

const PlayingToday = (props) => {
  const ctx = useContext(Context);
  const [lessPlayers, setLessPlayers] = useState(false);
  const [manyPlayers, setManyPlayers] = useState(false);
  const [numOfPlayers, setNumOfPlayers] = useState();
  const removeHandler = (id) => {
    ctx.rmvPlayerToday(id);
  };
  const teamsHandler = () => {
    setNumOfPlayers(ctx.playingToday.length);
    if (ctx.playingToday.length < 15) {
      setLessPlayers(true);
      return;
    }
    if (ctx.playingToday.length > 20) {
      setManyPlayers(true);
      return;
    }
    setLessPlayers(false);
    setManyPlayers(false);
    ctx.makeChoose();
    props.onChoose();
  };
  const playerList = (
    <ul className={classes.playing}>
      {ctx.playingToday.map((item) => (
        <Player
          act="מחק מבחירות"
          id={item.id}
          key={item.id}
          name={item.name}
          level={item.level}
          onAdd={removeHandler}
        ></Player>
      ))}
    </ul>
  );
  return (
    <Modal onHide={props.onHide}>
      {playerList}
      <div>
        <button onClick={props.onHide}>סגור</button>
        <button onClick={teamsHandler}>בצע בחירות</button>
      </div>
      {lessPlayers && <h2>מינימום שחקים לבחירות:15</h2>}
      {manyPlayers && <h2>מקסימום שחקנים לבחירות:20</h2>}
      {(manyPlayers || lessPlayers) && (
        <h2>{numOfPlayers} :מספר שחקנים כרגע</h2>
      )}
    </Modal>
  );
};

export default PlayingToday;
