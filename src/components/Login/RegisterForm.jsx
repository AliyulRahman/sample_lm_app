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

    // Construct the full user object
  const newUser = {
    fullName: form.fullName,
    email: form.email,
    phone: form.phone,
    password: form.password,
    status: "pending",  // <-- added
    role: "user",       // <-- added
  };

    // Simulate saving user
    addUser(newUser);
    setSubmitted(true);
    setError(""); // Reset error if form is successfully submitted
  };

  if (submitted) {
    return (
      <div className="register-success">
        <h2>Thanks for registration!</h2>
        <p>Your account will be activated upon review and approval. You will be notified by email.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Register</h2>

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label>Phone Number (with country code)</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="+1-555-1234567"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          placeholder="Confirm your password"
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
