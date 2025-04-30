import React, { useState } from "react";
import axios from "axios";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { SPRING_PORT } from "../constants/strings";
import { useAuth } from "./AuthContext";
import HomeNavbar from "../components/homeNavbar";

function Login({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const endpointMap = {
      user: "/user",
      restaurant: "/restaurant",
      admin: "/admin",
    };

    try {
      const res = await axios.post(SPRING_PORT + endpointMap[role]+"/login", {
        email,
        password,
      });
      alert("✅ Login successful!");
      login({
        role,
        email,
        isLoggedIn: true,
      });
      
      navigate(`${endpointMap[role]}/dashboard`);
      console.log("Login Response:", res.data);
    } catch (err) {
      alert("❌ Login failed. Check credentials.");
      console.error(err);
    }
  };

  const roleHeading = {
    user: "Welcome Back, Foodie!",
    restaurant: "Hello, Chef Boss!",
    admin: "Admin Access Panel",
  };

  return (
    <>
    <HomeNavbar />
    <div className="loginContainer">
      <h2>{roleHeading[role]}</h2>
      <form onSubmit={handleLogin} className="loginForm">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      {/* <p className="loginMessage">{message}</p> */}
      <div className="loginLinks">
        { !(role==="admin") &&
        <p>
          New here?{" "}
          <span
            className="linkText"
            onClick={() => navigate(`/${role}/register`)}
          >
            Register Instead
          </span>
        </p>
    }
        <p>
          <span
            className="linkText"
            onClick={() => navigate(`/${role}/forgot-password`)}
          >
            Forgot Password?
          </span>
        </p>
      </div>
    </div>
    </>
  );
}

export default Login;
