import Card from "../UI/Card";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <Card>
      <div class={classes["image-container"]}>
        <div class={classes.title}>Welcome to my protfolio page!</div>
      </div>

      <div>
        <h2>
          I am a 4th year B.Sc. student of Software Engineering with gpa-91 with
          2 semesters until graduation, <br/>looking for a challenging student
          position. <br />I am a hard working and passionate autodidact, who
          brings an innovative mindset. <br />
          My qualities include strong self-learning abilities, performing well
          under pressure, <br/>working great on teams and independently and being
          loyal and passionate.
        </h2>
      </div>

      

      <div className={classes.text}>
        Here you can find out about me, my experiance, my projects and the
        technologies I can work with...
      </div>
    </Card>
  );
};

export default Home;
