import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/contact">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to="/home">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink activeClassName={classes.active} to="/about">
            About
          </NavLink>
        </li>

        <li>
          <NavLink activeClassName={classes.active} to="/my-projects">
            My Projects
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
