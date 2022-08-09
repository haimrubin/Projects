import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailIcon from '@mui/icons-material/Mail';
import classes from './ContactInfo.module.css'

const ContactInfo = () => {
  return (
    <ul className={classes.contact}>
      <li>
        <div>
          <PhoneAndroidIcon />
          <label> Phone </label>
        </div>
        <label>052-291-4321</label>
      </li>

      <li>
        <div>
          <label> Email </label>
          <MailIcon />
        </div>
        <label>haimrubin1@gmail.com</label>
      </li>

    
    </ul>
  );
};

export default ContactInfo;
