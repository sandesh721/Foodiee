import { useNavigate } from "react-router-dom";
import "../css/homeNavbar.css";
import logo from "../images/logo.jpeg"
function HomeNavbar(){
    const navigate = useNavigate();

    return (
      <div className="navbar">
        <img src={logo} alt="logo" onClick={() => navigate("/")} />
      </div>
    );
}
export default HomeNavbar;