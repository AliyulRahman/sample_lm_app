import { useState, useEffect } from "react";
import { getUsers, updateUser } from "../../models/users";
import "./UsersTab.css";

export default function UsersTab() {
  const [users, setUsers] = useState(getUsers());
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

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
        fullName: userToSave.fullName,
        email: userToSave.email,
        phone: userToSave.phone,
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
                <td>
                  <input
                    type="text"
                    value={user.fullName}
                    onChange={(e) =>
                      handleChange(user.email, "fullName", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      handleChange(user.email, "email", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="tel"
                    value={user.phone}
                    onChange={(e) =>
                      handleChange(user.email, "phone", e.target.value)
                    }
                  />
                </td>
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
                    <option value="moderator">Bookstagrammer</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleSave(user.email)}>Save</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
