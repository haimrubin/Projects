import classes from "./TeamCard.module.css";

const TeamCard = (props) => {
  const players = props.players.map((item) => (
    <li key={item.id}>
      <h3>
        {item.name}
      </h3>
    </li>
  ));

  const color = `${props.color}`;

  return (
    <div className={classes.team}>
      <div className={classes[color]}>
        <h2>{props.color}</h2>
        <ul>{players}</ul>
      </div>
    </div>
  );
};

export default TeamCard;
