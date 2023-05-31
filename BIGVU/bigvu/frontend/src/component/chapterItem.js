import { AiOutlinePlayCircle } from "react-icons/ai";
import classes from "./chapterItem.module.css";
import { BsCheckLg } from "react-icons/bs";

const ChapterItem = (props) => {
  return (
    <div
      className={props.background === props.number ? classes.background : ""}
    >
      <li
        onClick={() => {
          props.onClick(props.url, props.number, props.id);
        }}
        className={classes.item}
      >
        {props.isWatched && (
          <BsCheckLg size="24px" color="green" className={classes.play} />
        )}
        {!props.isWatched && (
          <AiOutlinePlayCircle size="24px" className={classes.play} />
        )}

        <div className={classes.title}>
          {props.number + 1}.{props.title}
        </div>
        <div className={classes.time}>
          {Math.floor(props.duration / 60)}:
          {Math.floor(props.duration % 60)
            .toString()
            .padStart(2, "0")}
        </div>
      </li>
    </div>
  );
};
export default ChapterItem;
