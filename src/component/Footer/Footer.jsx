import Market from "../../assets/Market.svg";
import Trade from "../../assets/Trade-Icon.svg";
import Wallet from "../../assets/Wallet-Icon.svg";
import Menu from "../../assets/menu_icon.svg";
import "./Footer.css";

const FooterIcon = ({ icon, alt, iconText }) => {
  return (
    <div className="footer-icon">
      <img src={icon} alt={alt} />
      <span>{iconText}</span>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <FooterIcon icon={Market} alt="market-icon" iconText="Markets" />
        <FooterIcon icon={Trade} alt="trade-icon" iconText="Trade" />
        <FooterIcon icon={Wallet} alt="wallet-icon" iconText="$30.38" />
        <FooterIcon icon={Menu} alt="menu-icon" iconText="Menu" />
      </div>
    </div>
  );
};

export default Footer;
