
import classes from "./Links.module.css";
const Links = (props) => {
  return (
    <div className={classes.links}>
      {props.link && <a href={props.link}>Link</a>}
      {props.git && <a href={props.git}>Git</a>}
    </div>
  );
};

export default Links;
