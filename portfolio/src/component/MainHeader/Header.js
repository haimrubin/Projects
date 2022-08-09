import classes from "./Header.module.css";
import Navigation from "./Navigation";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.name}> Haim Rubin </div>
      <Navigation></Navigation>

    </header>
  );
};

export default Header;
