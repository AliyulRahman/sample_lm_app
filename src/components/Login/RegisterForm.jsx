import { useState } from "react";
import { addUser } from "../../models/users";
import "./RegisterForm.css";

export default function RegisterForm({ onClose }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const newUser = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      status: "pending",
      role: "user",
    };

    addUser(newUser);
    setSubmitted(true);
    setError("");
  };

  if (submitted) {
    return (
      <div className="register-success">
        <h2>Thanks for registering!</h2>
        <p>Your account will be reviewed. We’ll notify you by email.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>

        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />

        <label>Phone Number (with country code)</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="+1-555-1234567"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          placeholder="Confirm your password"
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
