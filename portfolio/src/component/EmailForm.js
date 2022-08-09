import classes from "./EmailForm.module.css";
import SendIcon from "@mui/icons-material/Send";
import emailjs from "emailjs-com";

const EmailForm = () => {
  const sendEmail = (event) => {
    event.preventDefault();
    emailjs
      .sendForm(
        "service_s0qwpyo",
        "template_2nidp11",
        event.target,
        "4WMj0VWAjt_ek4WUc"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));


    const myForm = document.getElementById('email_form');
    myForm.reset();

  };
  return (
    <div className={classes.main_img}>
      <div className={classes.main}>
        <form id="email_form" className={classes.email} onSubmit={sendEmail}>
          <div className={classes.title}>
            Want to send me a job offer? <br />
            Or just some email
          </div>
          <div>
            <input type="text" name="title" placeholder=" title"></input>
          </div>
          <div>
            <input type="text" name="name" placeholder=" your name"></input>
          </div>
          <div>
            <input
              type="email"
              name="user_email"
              placeholder=" your email"
            ></input>
          </div>
          <div>
            <textarea
              name="message"
              placeholder=" enter your message "
            ></textarea>
          </div>
          <button type="submit">
            Send <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};
export default EmailForm;
