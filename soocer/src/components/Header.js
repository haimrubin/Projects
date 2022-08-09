import { useContext } from "react";
import classes from "./Header.module.css";
import AuthContext from "./store/auth-context";
const Header = (props) => {
  const authCtx = useContext(AuthContext);
  

  return (
    <div className={classes.header}>
      <h1>כדורגל כלניות</h1>
      {authCtx.isLoggedIn && (
        <div>
          <button onClick={authCtx.onLogout}>התנתק</button>
          <button onClick={props.onShow}>משחקים היום</button>
          <button onClick={props.onAdd}>שחקן חדש</button>
        </div>
      )}
      
    </div>
  );
};

export default Header;
