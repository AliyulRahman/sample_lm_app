import { useState } from "react";
import { getUsers } from "../../models/users";
import RegisterForm from "../Login/RegisterForm";
import "./UsersTab.css";

export default function UsersTab() {
  const [users, setUsers] = useState(getUsers());
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // user data for editing

  const handleOpenForm = (user = null) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setShowForm(false);
    setUsers(getUsers()); // Refresh user list after add/update
  };

  return (
    <div className="tab-content">
      <div className="user-tab-header">
        <h2>Registered Users</h2>
        <button className="add-user-btn" onClick={() => handleOpenForm()}>
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
                  <button onClick={() => handleOpenForm(user)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="form-popup-overlay">
          <div className="form-popup">
            <button className="close-btn" onClick={handleCloseForm}>✕</button>
            <RegisterForm
              isAdminPanel={true}
              selectedUser={selectedUser}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}
