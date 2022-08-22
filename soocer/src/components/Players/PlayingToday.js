import {  useState } from "react";
import Modal from "../UI/Modal";
import Player from "./Player";
import classes from "./PlayingToday.module.css";

const PlayingToday = (props) => {
  const [lessPlayers, setLessPlayers] = useState(false);
  const [manyPlayers, setManyPlayers] = useState(false);
  const [numOfPlayers, setNumOfPlayers] = useState();

  async function removeHandler(id) {
    const playerIndex = props.players.findIndex((item) => item.id === id);
    const rmvPlayer = props.players[playerIndex];

    const url =
      "https://soocer-959bb-default-rtdb.firebaseio.com/players/" +
      id +
      ".json";
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ ...rmvPlayer, playing: false, team: 0 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    props.refresh();
  }

  const todayList = props.players.filter((item) => item.playing === true);

  const teamsHandler = () => {
    setNumOfPlayers(todayList.length);
    if (todayList.length < 15) {
      setLessPlayers(true);
      return;
    }
    if (todayList.length > 20) {
      setManyPlayers(true);
      return;
    }
    setLessPlayers(false);
    setManyPlayers(false);
    props.makeTeams();
    props.refresh();
  };

  const playerList = (
    <ul className={classes.playing}>
      {todayList.map((item) => (
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
