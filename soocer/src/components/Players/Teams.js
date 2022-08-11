import { useContext } from "react";
import Context from "../store/context";
import TeamCard from "./TeamCard";
import classes from './Teams.module.css'

const Teams = () => {
  const ctx = useContext(Context);
  const blue = ctx.playingToday.filter(item => item.team === "blue")
  const red = ctx.playingToday.filter(item => item.team === "red")
  const yellow = ctx.playingToday.filter(item => item.team === "yellow")
  const white = ctx.playingToday.filter(item => item.team === "white")
  return (
    <div className={classes.teams}>
      <TeamCard players={blue} color="blue"></TeamCard>
      <TeamCard players={red} color="yellow"></TeamCard>
      <TeamCard players={yellow} color="red"></TeamCard>
      {white.length>0 && <TeamCard players={white} color="white"></TeamCard>}
    </div>
  );
};

export default Teams;
