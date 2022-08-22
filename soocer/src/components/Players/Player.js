import classes from "./Player.module.css";

const Player = (props) => {
  
  const addHandler = () => {
    props.onAdd(props.id);
  };

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <li className={classes.player}>
      <div>
        {props.onDelete && <button onClick={deleteHandler}>מחק לצמיתות</button>}
        <button onClick={addHandler}>{props.act}</button>{" "}
      </div>
      <label>{props.level} :דירוג</label>

      <label>{props.name}</label>
    </li>
  );
};

export default Player;
