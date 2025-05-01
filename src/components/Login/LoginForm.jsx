import { useState } from "react";
import RegisterForm from "./RegisterForm";
import "./LoginForm.css";

export default function LoginForm() {
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) {
    return <RegisterForm onClose={() => setShowRegister(false)} />;
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          New user?{" "}
          <button onClick={() => setShowRegister(true)}>
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}
