import { useState } from "react";
import "./ContactUs.css";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    subject: "",
    question: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example: Replace with your email backend or API call
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setForm({
          name: "",
          phone: "",
          email: "",
          company: "",
          subject: "",
          question: "",
        });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("Error occurred. Please try again." + err);
    }
  };

  return (
    <div className="contact-container">
      <p>
        Contact us about anything related to our company or services. <br />
        We'll do our best to get back to you as soon as possible.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="question"
          placeholder="Your Question"
          rows="5"
          value={form.question}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </div>
  );
}
