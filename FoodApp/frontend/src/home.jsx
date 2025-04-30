import { useNavigate } from "react-router-dom";
import { APP_NAME } from "./constants/strings";
import "./css/home.css";
import homeImg from "./images/home.jpeg";

function Home() {

    const navigate = useNavigate();
  return (
    <div className="homeContainer">
      <div className="homeContent">
        <h2>Welcome to {APP_NAME} 👋</h2>

        <div className="taglineImg">
          <div className="tagline">
            <p>
              🍔 <strong>FoodieApp</strong> — where cravings meet their match!
              <br />
              Whether you're a hungry human or a master chef, we’ve got the bites and the bytes.
              <br />
              Order, manage, or rule the food kingdom — all in one tasty app!
            </p>
          </div>

          <img src={homeImg} alt="Delicious food" />
        </div>

        <div className="loginButtons">
          <button type="button" onClick={()=>navigate("/user/login")}>👤 I'm Hungry (User)</button>
          <button type="button" onClick={()=>navigate("/restaurant/login")}>👨‍🍳 I Own a Restaurant</button>
          <button type="button" onClick={()=>navigate("/admin/login")}>🛡️ Admin Portal</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
