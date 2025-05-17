import React, { useState } from "react";
import "./BookstagrammerDashboardTab.css";

const taskOptions = [
  "Giveaway",
  "Weekly task based",
  "Promotion",
  "Contest",
  "Referral",
];

const statusOptions = ["In Progress", "Completed", "Paused"];

export default function BookstagrammerDashboardTab() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [taskForm, setTaskForm] = useState({
    task: "",
    description: "",
    deadline: "",
    incentive: "",
    status: "In Progress",
  });
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [usersByTask, setUsersByTask] = useState({});
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    incentiveReceived: "",
    status: "In Progress",
  });
  const [editingUserIndex, setEditingUserIndex] = useState(null);

  const handleTaskChange = (e) =>
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });

  const addOrUpdateTask = () => {
    if (
      !taskForm.task ||
      !taskForm.description ||
      !taskForm.deadline ||
      !taskForm.incentive
    ) {
      alert("Please fill all task fields.");
      return;
    }

    if (selectedTaskIndex !== null) {
      const updated = [...tasks];
      updated[selectedTaskIndex] = taskForm;
      setTasks(updated);
    } else {
      setTasks([...tasks, taskForm]);
    }

    setTaskForm({
      task: "",
      description: "",
      deadline: "",
      incentive: "",
      status: "In Progress",
    });
    setSelectedTaskIndex(null);
  };

  const deleteTask = (idx) => {
    const updated = tasks.filter((_, i) => i !== idx);
    setTasks(updated);
  };

  const editTask = (idx) => {
    setSelectedTaskIndex(idx);
    setTaskForm(tasks[idx]);
  };

  const openUserPopup = (idx) => {
    setSelectedTaskIndex(idx);
    setShowUserPopup(true);
  };

  const closeUserPopup = () => {
    setShowUserPopup(false);
    setNewUser({
      name: "",
      email: "",
      incentiveReceived: "",
      status: "In Progress",
    });
    setEditingUserIndex(null);
  };

  const handleUserChange = (e) =>
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const addOrUpdateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.incentiveReceived) {
      alert("Please fill all user fields.");
      return;
    }

    const key = selectedTaskIndex;
    const users = usersByTask[key] || [];

    if (editingUserIndex !== null) {
      users[editingUserIndex] = newUser;
    } else {
      users.push(newUser);
    }

    setUsersByTask({ ...usersByTask, [key]: users });
    setNewUser({
      name: "",
      email: "",
      incentiveReceived: "",
      status: "In Progress",
    });
    setEditingUserIndex(null);
  };

  const editUser = (idx) => {
    const key = selectedTaskIndex;
    const users = usersByTask[key] || [];
    setNewUser(users[idx]);
    setEditingUserIndex(idx);
  };

  const deleteUser = (idx) => {
    const key = selectedTaskIndex;
    const users = usersByTask[key] || [];
    users.splice(idx, 1);
    setUsersByTask({ ...usersByTask, [key]: users });
  };

  return (
    <div className="dashboard-container">
      <h2>Bookstagrammer Dashboard</h2>

      <div className="task-form">
        <h3>Add/Edit Task</h3>
        <select name="task" value={taskForm.task} onChange={handleTaskChange}>
          <option value="">Select Task</option>
          {taskOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={taskForm.description}
          onChange={handleTaskChange}
        />
        <input
          type="date"
          name="deadline"
          value={taskForm.deadline}
          onChange={handleTaskChange}
        />
        <input
          type="text"
          name="incentive"
          placeholder="Incentive"
          value={taskForm.incentive}
          onChange={handleTaskChange}
        />
        <select
          name="status"
          value={taskForm.status}
          onChange={handleTaskChange}
        >
          {statusOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <button onClick={addOrUpdateTask}>
          {selectedTaskIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      <h3>Tasks</h3>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Incentive</th>
            <th>Status</th>
            <th>User Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, idx) => (
            <tr key={idx}>
              <td>{t.task}</td>
              <td>{t.description}</td>
              <td>{t.deadline}</td>
              <td>{t.incentive}</td>
              <td>{t.status}</td>
              <td>
                <button onClick={() => openUserPopup(idx)}>User Details</button>
              </td>
              <td>
                <button onClick={() => editTask(idx)}>Edit</button>
                <button onClick={() => deleteTask(idx)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUserPopup && (
        <div className="popup-overlay">
          <div className="user-popup">
            <h3>User Details</h3>
            <input
              type="text"
              name="name"
              placeholder="Bookstagrammer Name"
              value={newUser.name}
              onChange={handleUserChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Bookstagrammer Email"
              value={newUser.email}
              onChange={handleUserChange}
            />
            <input
              type="text"
              name="incentiveReceived"
              placeholder="Incentive Received"
              value={newUser.incentiveReceived}
              onChange={handleUserChange}
            />
            <select
              name="status"
              value={newUser.status}
              onChange={handleUserChange}
            >
              {statusOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <button onClick={addOrUpdateUser}>
              {editingUserIndex !== null ? "Update User" : "Add User"}
            </button>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Incentive Received</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(usersByTask[selectedTaskIndex] || []).map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.incentiveReceived}</td>
                    <td>{user.status}</td>
                    <td>
                      <button onClick={() => editUser(idx)}>Edit</button>
                      <button onClick={() => deleteUser(idx)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="close-btn" onClick={closeUserPopup}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
