import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/";
import LoginForm from "./components/Login/LoginForm";
import Admin from "./components/Admin/";
import "./App.css";
import Services from "./components/Services";
import Navbar from "./components/Navbar/";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}
