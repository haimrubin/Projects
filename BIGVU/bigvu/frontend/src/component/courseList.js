import CourseItem from "./courseItem";
import classes from "./courseList.module.css";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

    useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch(`/courses-list`);

      if (!response.ok) {
        console.log("Fetching events failed.");
      } else {
        const resData = await response.json();
        setCourses(resData.result);
      }

      setIsLoading(false);
    }

    fetchEvents();
  }, []);

  // useEffect(() => {
  //   async function fetchEvents() {
  //     setIsLoading(true);
  //     const response = await fetch(`/course/list`, {
  //       headers: {
          
          
  //         Authorization: "Basic " + btoa("bigvu:interview"),
  //       },
  //     });

  //     if (!response.ok) {
  //       console.log("Fetching events failed.");
  //     } else {
  //       const resData = await response.json();
  //       setCourses(resData.result);
  //     }

  //     setIsLoading(false);
  //   }

  //   fetchEvents();
  // }, []);

  if (isLoading) {
    return <Spinner/>;
  }

  const coursesList = courses.map((item, index) => (
    <CourseItem
      id={item.id}
      key={index}
      index={index}
      headline={item.headline}
      description={item.description}
      summary={item.summary}
    ></CourseItem>
  ));

  return (
    <div className={classes.container}>
      <div className={classes.title}>BIGVU 101 Crash Course</div>
      <div className={classes.abstract}>
        Zero editing experience to pro — your journey starts here. Watch
        step-by-step video lessons how to make videos with impact.
      </div>

      <ul className={classes.list}>{coursesList}</ul>
    </div>
  );
};
export default CourseList;
