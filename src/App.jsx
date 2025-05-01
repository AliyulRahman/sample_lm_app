import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/";
import LoginForm from "./components/Login/LoginForm";
import Admin from "./components/Admin/";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
