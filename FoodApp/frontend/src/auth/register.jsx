 import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";
import { SPRING_PORT } from "../constants/strings";
import HomeNavbar from "../components/homeNavbar";

function Register({ role }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const endpointMap = {
    user: "/user",
    restaurant: "/restaurant",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !user.name ||
      !user.email ||
      !user.address ||
      !user.password ||
      !user.confirmPassword ||
      !user.phone
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(SPRING_PORT + endpointMap[role] + "/register", user);
      alert(response.data);
      navigate(`/${role}/login`);
    } catch (error) {
      alert(error.response?.data || "Registration failed");
    }
  };

  return (
<>
      <HomeNavbar />
    <div className="registerContainer">
      <div className="registerContent">
        <h2>{role === "restaurant" ? "Restaurant Signup" : "User Registration"}</h2>
        <form onSubmit={handleSubmit} className="registerForm">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} value={user.name} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} value={user.email} />
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} value={user.phone} />
          <input type="text" name="address" placeholder="Address" onChange={handleChange} value={user.address} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} value={user.password} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={user.confirmPassword} />
          <button type="submit">Register</button>
        </form>
        <button className="backLoginBtn" onClick={() => navigate(`/${role}/login`)}>
          🔙 Back to Login
        </button>
      </div>
    </div>
    </>
  );
}

export default Register;
