import Links from "../UI/Links";
import classes from "./ProjItem.module.css";

const ProjItem = (props) => {
  return (
    <li className={classes.item}>
      <div className={classes.text}>
        <h1>{props.title}</h1>
        <h3>{props.txt}</h3>
      </div>

      <Links link={props.link} git={props.git}></Links>
    </li>
  );
};

export default ProjItem;
