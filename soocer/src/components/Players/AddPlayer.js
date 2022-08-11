import { useContext, useRef } from "react";
import Context from "../store/context";
import Card from "../UI/Card";
import classes from "./AddPlayer.module.css";

const AddPlayer = (props) => {
  const ctx = useContext(Context);
  const name = useRef();
  const id = useRef();
  const level = useRef();

  const addHandler = (event) => {
    event.preventDefault();
    const player = {
      id: id.current.value,
      name: name.current.value,
      level: level.current.value,
      team: 0,
    };
    ctx.newPlayer(player);

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
            ref={id}
            type="number"
            placeholder="הכנס תז כולל ספרת ביקורת"
          ></input>
          <label> :ת"ז</label>
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
