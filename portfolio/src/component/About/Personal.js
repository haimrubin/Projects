import Card from "../../UI/Card";
import classes from './Personal.module.css'



const Personal = () => {
  return (
    <Card className={classes.personal}>
      <h1>Hi, I'm Haim </h1>
      <h3>
        I am 25 years old, I am a curious person who likes to learn new things.
        <br/>I have many hobbies but the main ones are: walking in nature, trying new
        restaurants and the main hobby is riding dirt bikes.
      </h3>
    </Card>
  );
};

export default Personal;
