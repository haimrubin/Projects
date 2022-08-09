import img1 from "../../photos/img1.jpeg";
import img2 from "../../photos/img2.jpeg";
import img3 from "../../photos/img3.jpeg";
import img4 from "../../photos/img4.jpeg";
import img5 from "../../photos/img5.jpeg";
import Card from "../../UI/Card";

import classes from "./Images.module.css";

const images = [img3, img2, img4, img1, img5];
const imgList = images.map((item) => (
  <img src={item} height={500} width={"19%"} alt="images"></img>
));

const Images = () => {
  return (
    <Card className={classes.images}>
        <h1>A little me</h1>
        <h2 color="white">I believe a picture is worth more than words...</h2>
        {imgList}
    </Card>
  );
};

export default Images;
