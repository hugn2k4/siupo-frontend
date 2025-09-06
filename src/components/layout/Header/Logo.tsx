import { Link } from "react-router-dom";
import LogoImg from "../../../assets/images/logo.png";
function Logo() {
  return (
    <Link to="/" className="flex items-center w-16 h-16">
      <img src={LogoImg} alt="Logo" className="w-full h-full object-cover" />
    </Link>
  );
}

export default Logo;
