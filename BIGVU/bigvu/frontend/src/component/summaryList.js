import classes from "./courseItem.module.css";

const SummaryList = (props) => {
  const markerColor = "marker" + props.gradient;
  const summaries = props.list.map((item,index) => (
    <div className={classes.summaryItem} key={index}>
      <div className={`${classes.marker} ${classes[markerColor]}`}></div>

      <div>{item}</div>
    </div>
  ));
  return <div className={classes.summary}>{summaries}</div>;
};

export default SummaryList;

