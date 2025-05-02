import { useState } from "react";
import RegisterForm from "./RegisterForm";
import "./LoginForm.css";

export default function LoginForm() {
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) {
    return <RegisterForm onClose={() => setShowRegister(false)} />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    alert("Login logic not yet implemented");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />

          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          New user?{" "}
          <button type="button" onClick={() => setShowRegister(true)}>
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}
