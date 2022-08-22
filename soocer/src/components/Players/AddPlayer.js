import { useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddPlayer.module.css";

const AddPlayer = (props) => {
  async function addPlayer(player) {
    await fetch(
      "https://soocer-959bb-default-rtdb.firebaseio.com/players.json",
      {
        method: "POST",
        body: JSON.stringify(player),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    props.refresh();
  }
  const name = useRef();
  const level = useRef();

  const addHandler = (event) => {
    event.preventDefault();
    const player = {
      name: name.current.value,
      level: level.current.value,
      team: 0,
      playing: false,
    };
    // ctx.newPlayer(player);

    addPlayer(player);
    
    props.onHide();
  };

  return (
    <Card className={classes.add_player}>
      <form onSubmit={addHandler}>
        <h2>הוסף שחקן חדש</h2>
        <div>
          <input ref={name} type="text" placeholder="שם ושם משפחה"></input>
          <label> :שם השחקן</label>
        </div>
        <div>
          <input
            ref={level}
            type="number"
            min={1}
            max={5}
            placeholder=" 1-5"
          ></input>
          <label> :דירוג</label>
        </div>
        <button type="submit">הוסף</button>
      </form>
    </Card>
  );
};

export default AddPlayer;
