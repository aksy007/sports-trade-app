import PredLogo from "../../assets/Logo.svg";
import Star from "../../assets/Star.svg";
import Notifications from "../../assets/notifications.svg";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div>
        <img src={PredLogo} alt="pred-logo" />
      </div>
      <div>
        <img src={Star} alt="star-logo" />
        <img src={Notifications} alt="notification" />
      </div>
    </div>
  );
};

export default Header;
