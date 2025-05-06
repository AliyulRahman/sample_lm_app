import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* <div className="navbar-logo" onClick={() => navigate("/")}><FaHome/></div> */}

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <div className="navbar-left">
        <div className="navbar-logo" onClick={() => navigate("/")}><FaHome/></div>
          <button onClick={() => navigate("/admin")}>Admin</button>
          <button onClick={() => navigate("/services")}>Services</button>
          <button onClick={() => navigate("/")}>Author Dashboard</button>
          <button onClick={() => navigate("/")}>Bookstagrammer Dashboard</button>
        </div>
        <div className="navbar-right">
          <button onClick={() => navigate("/contactus")}>Contact Us</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    </nav>
  );
}
