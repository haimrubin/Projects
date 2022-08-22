import TeamCard from "./TeamCard";
import classes from "./Teams.module.css";

const Teams = (props) => {
  const blue = props.players.filter((item) => item.team === "blue");
  const red = props.players.filter((item) => item.team === "red");
  const yellow = props.players.filter((item) => item.team === "yellow");
  const white = props.players.filter((item) => item.team === "white");
  return (
    <div className={classes.teams}>
      <h2>Teams</h2>
      <div className={classes.cards}>
        <TeamCard players={blue} color="blue"></TeamCard>
        <TeamCard players={red} color="yellow"></TeamCard>
        <TeamCard players={yellow} color="red"></TeamCard>
        {white.length > 0 && (
          <TeamCard players={white} color="white"></TeamCard>
        )}
      </div>
    </div>
  );
};

export default Teams;
