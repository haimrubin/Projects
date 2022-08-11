import ProjItem from '../component/ProjItem'
import Card from '../UI/Card';
import classes from "./Proj.module.css";

const data = [
  {
    key: "p2",
    title: "My Portfolio",
    txt: "an example of one of my projects,represent my other project's and showing about me and my life",
    link: "https://protfolio-441f6.web.app/home",
    git: "https://github.com/haimrubin/Projects/tree/main/portfolio",
  },
  {
    key: "p1",
    title: "News Site",
    txt: "online news website that interact with users",
    link: "https://newsappprod.herokuapp.com",
    git: "https://github.com/haimrubin/Projects/tree/main/News%20app",
  },
  {
    key: "p3",
    title: "Soccer",
    txt: "app to manage your football teams when you play with your friends",
    link: "",
    git: "https://github.com/haimrubin/Projects/tree/main/soocer",
  },
];

const projList = data.map((item) => (
  <ProjItem
    key={item.key}
    title={item.title}
    txt={item.txt}
    git={item.git}
    link={item.link}
  ></ProjItem>
));

const Proj = () => {
  return (
    <Card className={classes.projs}>
      <ul>{projList}</ul>
    </Card>
  );
};

export default Proj;
