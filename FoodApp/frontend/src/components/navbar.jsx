import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./navbar.css";
import logo from '../images/logo.jpeg';

function Navbar() {
    const { auth, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/");
  };

  // If not logged in, do not render the navbar
  if (!auth?.isLoggedIn) return null;

  let navItems = [];

  if (auth.role === "user") {
    navItems = [
      { label: "Dashboard", path: "/user/dashboard" },
      { label: "My Orders", path: "/user/orders" },
      { label: "Restaurants", path: "/user/restaurants" },
      { label: "Categories", path: "/user/categories" },
      { label: "Profile", path: "/user/profile" },
    ];
  } else if (auth.role === "restaurant") {
    navItems = [
      { label: "Dashboard", path: "/restaurant/dashboard" },
      { label: "Categories", path: "/restaurant/categories" },
      { label: "Items", path: "/restaurant/items" },
      { label: "Delivery", path: "/restaurant/delivery" },
      { label: "Profile", path: "/restaurant/profile" },
    ];
  } else if (auth.role === "admin") {
    navItems = [
      { label: "Registration Request", path: "/admin/dashboard" },
      { label: "All Restaurants", path: "/admin/restaurants" },
      { label: "All Users", path: "/admin/users" },
      { label: "Profile", path: "/admin/profile" },
    ];
  }

  return (
    <div className="navbarContainer">
      <div className="Foodie">
        <img src={logo} alt="logo" className="logo" />
        <h3>Foodie..</h3>
      </div>

      <ul className="navbarList">
        {navItems.map((item, index) => (
          <li key={index} className="navbarItem">
            <Link to={item.path} className="navbarLink">
              {item.label}
            </Link>
          </li>
        ))}
        <li className="navbarItem" onClick={handleLogout}>
          <span className="navbarLink">Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
