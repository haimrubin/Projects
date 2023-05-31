import classes from "./courseItem.module.css";
import { BsFillCameraVideoFill, BsCheckLg } from "react-icons/bs";
import SummaryList from "./summaryList";
import { Link } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

const gradients = ["ocean", "green", "sunset"];

const CourseItem = (props) => {
  const gradient = gradients[props.index % gradients.length];
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState([]);

  // const count = JSON.parse(localStorage.getItem(props.id + "count"));
  const completeChapters = localStorage.getItem(props.id);
  const complete = completeChapters ? JSON.parse(completeChapters) : [];

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch(`/course/${props.id}`);

      if (!response.ok) {
        console.log("Fetching events failed.");
      } else {
        const resData = await response.json();
        setCourse(resData);
        // localStorage.setItem(props.id + "count", resData.chapters.length);
        console.log(props.id);
      }

      setIsLoading(false);
    }
    // if (count === null) {
    //   fetchEvents();
    // } else {
    //   setIsLoading(false);
    // }
    fetchEvents();
  }, [props.id]);

  if (isLoading) {
    return <Spinner />;
  }

  // let isComplete;
  // let len;
  // if (count) {
  //   isComplete = count === complete.length;
  //   len = count;
  // } else {
  //   isComplete = complete.length === course.chapters.length;
  //   len = course.chapters.length;
  // }
  const isComplete = complete.length === course.chapters.length;
  const len = course.chapters.length;


  return (
    <li className={classes.item}>
      <Link className={classes.link} to={`/${props.id}`}>
        <div className={`${classes.headline} ${classes[gradient]}`}>
          {props.headline}
        </div>
        <div className={classes.container}>
          <div className={`${classes.draw} ${classes[gradient + "img"]}`}></div>
          <div style={{ display: "flex" }}>
            <div className={classes.count}>
              <BsFillCameraVideoFill style={{ marginRight: "4px" }} />
              {len} videos
            </div>
            {isComplete && (
              <div>
                {" "}
                <BsCheckLg size="24px" color="green" />
              </div>
            )}
          </div>
          <div className={classes.description}>{props.description}</div>
          <div>
            <IoIosArrowDroprightCircle className={classes.arrow} />
            <SummaryList list={props.summary} gradient={gradient} />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default CourseItem;
