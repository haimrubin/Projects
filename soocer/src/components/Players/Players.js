

import Card from "../UI/Card";
import Player from "./Player";

const Players = (props) => {
  async function addHandler(id) {
    const playerIndex = props.players.findIndex((item) => item.id === id);
    const addedPlayer = props.players[playerIndex];

    const url =
      "https://soocer-959bb-default-rtdb.firebaseio.com/players/" +
      id +
      ".json";
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ ...addedPlayer, playing: true }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    props.refresh();
  }

  async function deleteHandler(id) {
    const url =
      "https://soocer-959bb-default-rtdb.firebaseio.com/players/" +
      id +
      ".json";
    await fetch(url, {
      method: "DELETE",
    });
    props.refresh();
  }

  const notPlaying = props.players.filter(item => item.playing === false)
  const playersList = (
    <ul>
      {notPlaying.map((item) => (
        <Player
          act="הוסף לבחירות"
          id={item.id}
          key={item.id}
          name={item.name}
          level={item.level}
          playing={false}
          onDelete={deleteHandler}
          onAdd={addHandler}
        ></Player>
      ))}
    </ul>
  );

  return <Card>{playersList}</Card>;
};

export default Players;
