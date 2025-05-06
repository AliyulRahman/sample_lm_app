import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button onClick={() => navigate("/admin")}>Admin</button>
        <button onClick={() => navigate("/services")}>Services</button>
        <button onClick={() => navigate("/")}>Author Dashboard</button>
        <button onClick={() => navigate("/")}>Bookstagrammer Dashboard</button>
      </div>
      <div className="navbar-right">
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </nav>
  );
}
