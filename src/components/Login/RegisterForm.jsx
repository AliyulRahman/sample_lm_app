import { useState, useEffect } from "react";
import { addUser, updateUser } from "../../models/users";
import "./RegisterForm.css";

export default function RegisterForm({ onClose, isAdminPanel, selectedUser }) {
  const [form, setForm] = useState({
    email: "",
    name: "",
    gender: "",
    status: "",
    whatsapp: "",
    city: "",
    instagram: "",
    goodreads: "",
    role: "",
    reviewFrequency: "",
    bookType: "",
    collaboratedWithAuthors: "",
    collaborationExperience: "",
    paidOrPrBoxesPartnership: "",
    promotionalPostsForBooks: "",
    amountExpectationPerReview: "",
    partnershipTerm: "",
    openForSocialMediaPromotion: "",
    openForAgreement: "",
    source: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setForm(selectedUser);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (selectedUser) {
      updateUser(form.email, form);
    } else {
      addUser({ ...form, status: "pending" });
    }

    setSubmitted(true);
    setError("");
  };

  if (submitted && !selectedUser) {
    return (
      <div className="register-success">
        <h2>Thanks for registering!</h2>
        <p>Your account will be reviewed. We’ll notify you by email.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  if (submitted && isAdminPanel) {
    if (selectedUser) {
      return (
        <div className="register-success">
          <p>Data updated successfully.</p>
          <button onClick={onClose}>Close</button>
        </div>
      );
    }
    else {
      return (
        <div className="register-success">
          <p>Data added successfully.</p>
          <button onClick={onClose}>Close</button>
        </div>
      );
    }
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>{selectedUser ? "User Details" : "Register"}</h2>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={!!selectedUser}
        />

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        {isAdminPanel && (
          <>
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="">Select</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>
          </>
        )}

        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>WhatsApp Number</label>
        <input
          type="text"
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
        />

        <label>Instagram ID</label>
        <input
          type="text"
          name="instagram"
          value={form.instagram}
          onChange={handleChange}
        />

        <label>Goodreads ID</label>
        <input
          type="text"
          name="goodreads"
          value={form.goodreads}
          onChange={handleChange}
        />

        <label>Which role are you willing to play?</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Bookstagrammer">Bookstagrammer</option>
          <option value="Book Reviewer">Book Reviewer</option>
          <option value="Beta reader">Beta reader</option>
          {isAdminPanel && <option value="Author">Author</option>}
          {isAdminPanel && <option value="Admin">Admin</option>}
        </select>

        <label>How often do you post book reviews?</label>
        <select
          name="reviewFrequency"
          value={form.reviewFrequency}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="occasionally">Occasionally</option>
          <option value="rarely">Rarely</option>
        </select>

        <label>What type of books are you willing to review?</label>
        <select name="bookType" value={form.bookType} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Fiction">Fiction</option>
          <option value="Sci-fi">Sci-fi</option>
          <option value="Romance">Romance</option>
          <option value="Mystery">Mystery</option>
          <option value="Thriller">Thriller</option>
          <option value="Non fiction">Non fiction</option>
          <option value="Self help">Self help</option>
          <option value="Humor">Humor</option>
          <option value="Poetry">Poetry</option>
          <option value="Biography">Biography</option>
          <option value="Up for anything! cuz I love books">
            Up for anything! cuz I love books
          </option>
        </select>

        <label>Have you ever collaborated with authors/companies before?</label>
        <select
          name="collaboratedWithAuthors"
          value={form.collaboratedWithAuthors}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label>If Yes, then mention it</label>
        <input
          type="text"
          name="collaborationExperience"
          value={form.collaborationExperience}
          onChange={handleChange}
        />

        <label>
          Would you like to switch between paid or pr boxes partnership or stick
          to one?
        </label>
        <select
          name="paidOrPrBoxesPartnership"
          value={form.paidOrPrBoxesPartnership}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Stick to paid partnerships">
            Stick to paid partnerships
          </option>
          <option value="Switch to pr boxes according to what you're offering">
            Switch to pr boxes according to what you're offering
          </option>
        </select>

        <label>
          Would be open to sharing promotional posts for books we feature?
        </label>
        <select
          name="promotionalPostsForBooks"
          value={form.promotionalPostsForBooks}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label>How much do you expect per book review</label>
        <input
          type="text"
          name="amountExpectationPerReview"
          value={form.amountExpectationPerReview}
          onChange={handleChange}
        />

        <label>Are you willing to partnership with us?</label>
        <select
          name="partnershipTerm"
          value={form.partnershipTerm}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Long term">Long term</option>
          <option value="Short term">Short term</option>
        </select>

        <label>
          Do you agree to promote us and the on board book lovers on your social
          media?
        </label>
        <select
          name="openForSocialMediaPromotion"
          value={form.openForSocialMediaPromotion}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label>Are you willing to sign up for an agreement with us?</label>
        <select
          name="openForAgreement"
          value={form.openForAgreement}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label>How did you hear about us?</label>
        <select name="source" value={form.source} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Instagram">Instagram</option>
          <option value="Whatsapp">Whatsapp</option>
          <option value="Facebook">Facebook</option>
          <option value="Website">Website</option>
          <option value="Events">Events</option>
          <option value="Friends">Friends</option>
          <option value="Other">Other</option>
        </select>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">{selectedUser ? "Update" : "Submit"}</button>
        {/* <button type="button" onClick={onClose} className="cancel-button">
          Close
        </button> */}
      </form>
    </div>
  );
}
