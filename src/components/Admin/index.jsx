import { useState, useEffect } from "react";
import { getUsers, updateUser } from "../../models/users";
// import { useTheme } from "../../context/ThemeContext";
import "./Admin.css";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState(getUsers());
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  // const { theme, setTheme } = useTheme();

  const handleChange = (email, field, value) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.email === email ? { ...user, [field]: value } : user
      )
    );
  };

  const handleSave = (email) => {
    const userToSave = users.find((user) => user.email === email);
    if (userToSave) {
      updateUser(email, {
        status: userToSave.status,
        role: userToSave.role,
      });
      setUsers(getUsers());
      setPopupMessage(`Saved changes for ${userToSave.fullName}`);
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <div className="admin-tabs">
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={activeTab === "reports" ? "active" : ""}
          onClick={() => setActiveTab("reports")}
        >
          Reports
        </button>
        <button
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "users" && (
          <div className="tab-content">
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
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <select
                          value={user.status}
                          onChange={(e) =>
                            handleChange(user.email, "status", e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      </td>
                      <td>
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleChange(user.email, "role", e.target.value)
                          }
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="moderator">Moderator</option>
                        </select>
                      </td>
                      <td>
                        <button onClick={() => handleSave(user.email)}>
                          Save
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "reports" && <p>Reports tab coming soon.</p>}
        {activeTab === "settings" && (
          <div className="tab-content">
            <h3>Theme Settings</h3>
            <label>Select Theme:</label>
            <select>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
