import { useState } from "react";
import { getUsers } from "../../models/users";
import RegisterForm from "../Login/RegisterForm";
import BookstagrammerInput from "./BookstagrammerInput";
import AuthorInput from "./AuthorInput";
import "./UsersTab.css";

export default function UsersTab() {
  const [users, setUsers] = useState(getUsers());
  // const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activePopup, setActivePopup] = useState(""); // "form", "bookstagrammer", or "author"

  const openPopup = (type, user = null) => {
    setSelectedUser(user);
    setActivePopup(type);
  };

  const closePopup = () => {
    setSelectedUser(null);
    setActivePopup("");
    setUsers(getUsers()); // Refresh list
  };

  return (
    <div className="tab-content">
      <div className="user-tab-header">
        <h2>Registered Users</h2>
        <button className="add-user-btn" onClick={() => openPopup("form")}>
          + Add User
        </button>
      </div>

      {users.length === 0 ? (
        <p>No registered users yet.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
              <th>Bookstagrammer</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.whatsapp}</td>
                <td>{user.status}</td>
                <td>{Array.isArray(user.role) ? user.role.join(', ') : user.role}</td>
                <td>
                  <button className="role-btn" onClick={() => openPopup("form", user)}>View/Edit</button>
                </td>
                <td>
                  <button className="role-btn" onClick={() => openPopup("bookstagrammer", user)}>
                    View/Edit
                  </button>
                </td>
                <td>
                  <button className="role-btn" onClick={() => openPopup("author", user)}>
                  View/Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activePopup === "form" && (
        <div className="form-popup-overlay">
          <div className="form-popup">
            <button className="close-btn" onClick={closePopup}>✕</button>
            <RegisterForm
              isAdminPanel={true}
              selectedUser={selectedUser}
              onClose={closePopup}
            />
          </div>
        </div>
      )}

      {activePopup === "bookstagrammer" && (
        <div className="form-popup-overlay">
          <div className="form-popup">
            <button className="close-btn" onClick={closePopup}>✕</button>
            <BookstagrammerInput user={selectedUser} />
          </div>
        </div>
      )}

      {activePopup === "author" && (
        <div className="form-popup-overlay">
          <div className="form-popup">
            <button className="close-btn" onClick={closePopup}>✕</button>
            <AuthorInput user={selectedUser} />
          </div>
        </div>
      )}
    </div>
  );
}
