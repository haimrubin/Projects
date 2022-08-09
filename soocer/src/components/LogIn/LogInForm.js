import { useContext,useRef } from "react";
import AuthContext from "../store/auth-context";
import Card from "../UI/Card";
import classes from "./LogInForm.module.css";

const LogInForm = () => {
  const authCtx = useContext(AuthContext);
  const userName = useRef();
  const password = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if (password.current.value.length > 6) {
      authCtx.onLogin(userName.current.value, password.current.value);
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div>
          <label>User Name</label>
          <input ref={userName} type="text" minLength={4} placeholder="user name"></input>
        </div>
        <div>
          <label>Password</label>
          <input type="password" minLength={6} ref={password} placeholder="password"></input>
        </div>
        <button type="submit">Log In</button>
      </form>
    </Card>
  );
};

export default LogInForm;
