import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-left">
          <button onClick={() => navigate("/admin")}>Admin</button>
          <button onClick={() => navigate("/services")}>Services</button>
          <button onClick={() => navigate("/")}>Author Dashboard</button>
          <button onClick={() => navigate("/")}>Bookstagrammer Dashboard</button>
        </div>
        <div className="navbar-right">
          <button onClick={handleLogin}>Login</button>
        </div>
      </nav>

      <div className="home-content">
        <h1>Welcome to Literaire Milestone App</h1>
        <p>This is the home page of your application.</p>
      </div>
    </div>
  );
}
