import { useState, useEffect } from "react";
import "./AuthorInput.css";

const STORAGE_KEY = "authorDetails";

const serviceOptions = [
  "Publishing",
  "Printing",
  "Distribution",
  "Marketing",
  "Book tour",
  "Book marketing campaign",
  "Book Reviews",
];

const statusOptions = [
  "To be Started",
  "In Progress",
  "Paused",
  "Completed",
];

export default function AuthorInput({ user, onClose }) {
  const [authorData, setAuthorData] = useState({
    authorName: "",
    emailId: "",
    joiningDate: "",
    contactNumber: "",
    servicesOpted: [],
    totalPrice: "",
    amountPaid: "",
    books: [],
  });

  const [newBook, setNewBook] = useState({
    bookName: "",
    publishedDate: "",
    status: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { data: [] };
    const existing = saved.data.find((entry) => entry.userEmail === user.email);
    if (existing) {
      setAuthorData({
        ...existing,
        books: Array.isArray(existing.books) ? existing.books : [],
      });
    }
  }, [user]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setAuthorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setAuthorData((prev) => ({ ...prev, servicesOpted: options }));
  };

  const handleBookInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBook = () => {
    if (!newBook.bookName || !newBook.publishedDate || !newBook.status) {
      setError("Please fill in all book fields.");
      return;
    }

    setAuthorData((prev) => ({
      ...prev,
      books: [...(prev.books || []), newBook],
    }));

    setNewBook({ bookName: "", publishedDate: "", status: "" });
    setError("");
  };

  const handleDeleteBook = (index) => {
    const updated = [...authorData.books];
    updated.splice(index, 1);
    setAuthorData((prev) => ({ ...prev, books: updated }));
  };

  const handleEditBook = (index, field, value) => {
    const updated = [...authorData.books];
    updated[index][field] = value;
    setAuthorData((prev) => ({ ...prev, books: updated }));
  };

  const handleSave = () => {
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { data: [] };
    const idx = storage.data.findIndex((entry) => entry.userEmail === user.email);

    const updated = {
      ...authorData,
      userEmail: user.email,
      books: Array.isArray(authorData.books) ? authorData.books : [],
    };

    if (idx !== -1) storage.data[idx] = updated;
    else storage.data.push(updated);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    onClose();
  };

  return (
    <div className="author-popup">
      <h2>Author Details for {user.name}</h2>

      <label>Author Name:</label>
      <input name="authorName" value={authorData.authorName} onChange={handleFieldChange} />

      <label>Email ID:</label>
      <input name="emailId" value={authorData.emailId} onChange={handleFieldChange} />

      <label>Joining Date:</label>
      <input type="date" name="joiningDate" value={authorData.joiningDate} onChange={handleFieldChange} />

      <label>Contact Number:</label>
      <input name="contactNumber" value={authorData.contactNumber} onChange={handleFieldChange} />

      <label>Services Opted:</label>
      <select multiple value={authorData.servicesOpted} onChange={handleServiceChange}>
        {serviceOptions.map((s, i) => (
          <option key={i} value={s}>{s}</option>
        ))}
      </select>

      <label>Total Price:</label>
      <input name="totalPrice" value={authorData.totalPrice} onChange={handleFieldChange} />

      <label>Amount Paid:</label>
      <input name="amountPaid" value={authorData.amountPaid} onChange={handleFieldChange} />

      <hr />
      <h3>Books</h3>

      {error && <p className="error">{error}</p>}

      <div className="book-form">
        <input
          name="bookName"
          placeholder="Book Name"
          value={newBook.bookName}
          onChange={handleBookInputChange}
        />
        <input
          type="date"
          name="publishedDate"
          value={newBook.publishedDate}
          onChange={handleBookInputChange}
        />
        <select name="status" value={newBook.status} onChange={handleBookInputChange}>
          <option value="">Select Status</option>
          {statusOptions.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      <table className="book-table">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Published Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(authorData.books || []).map((book, index) => (
            <tr key={index}>
              <td>
                <input
                  value={book.bookName}
                  onChange={(e) => handleEditBook(index, "bookName", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={book.publishedDate}
                  onChange={(e) => handleEditBook(index, "publishedDate", e.target.value)}
                />
              </td>
              <td>
                <select
                  value={book.status}
                  onChange={(e) => handleEditBook(index, "status", e.target.value)}
                >
                  {statusOptions.map((s, i) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteBook(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="author-actions">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
