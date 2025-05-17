import { useState, useEffect } from "react";
import "./BookstagrammerInput.css";

const STORAGE_KEY = "bookstagrammerDetails";

export default function BookstagrammerInput({ user, onClose }) {
  const [form, setForm] = useState({
    bookstagrammerName: "",
    lmbhId: "",
    instaId: "",
    emailId: "",
    upiId: ""
  });

  const [tasks, setTasks] = useState([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [taskInput, setTaskInput] = useState({
    task: "",
    deadline: "",
    status: "In Progress",
    incentiveAmount: "",
    incentiveStatus: "Pending"
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { data: [] };
    const userEntry = savedData.data.find(entry => entry.userEmail === user.email);
    if (userEntry) {
      setForm(userEntry.details || form);
      setTasks(userEntry.tasks || []);
    }
  }, [user]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTaskChange = (e) => {
    setTaskInput({ ...taskInput, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateTask = () => {
    if (editingTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex] = taskInput;
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
    } else {
      setTasks([...tasks, taskInput]);
    }

    setTaskInput({
      task: "",
      deadline: "",
      status: "In Progress",
      incentiveAmount: "",
      incentiveStatus: "Pending"
    });
  };

  const handleEdit = (index) => {
    setEditingTaskIndex(index);
    setTaskInput(tasks[index]);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleSave = () => {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { data: [] };
    const existingIndex = savedData.data.findIndex(entry => entry.userEmail === user.email);

    const entry = { userEmail: user.email, details: form, tasks };

    if (existingIndex !== -1) {
      savedData.data[existingIndex] = entry;
    } else {
      savedData.data.push(entry);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
    onClose();
  };

  return (
    <div className="bookstagrammer-popup">
      <h3>Bookstagrammer Details - {user.name}</h3>

      <div className="form-field"><label>Name:</label><input name="bookstagrammerName" value={form.bookstagrammerName} onChange={handleFormChange} /></div>
      <div className="form-field"><label>LMBH ID:</label><input name="lmbhId" value={form.lmbhId} onChange={handleFormChange} /></div>
      <div className="form-field"><label>Instagram ID:</label><input name="instaId" value={form.instaId} onChange={handleFormChange} /></div>
      <div className="form-field"><label>Email ID:</label><input name="emailId" value={form.emailId} onChange={handleFormChange} /></div>
      <div className="form-field"><label>UPI ID:</label><input name="upiId" value={form.upiId} onChange={handleFormChange} /></div>

      <h4>Tasks</h4>

      <button className="add-task-btn" onClick={handleAddOrUpdateTask}>
        {editingTaskIndex !== null ? "Update Task" : "Add Task"}
      </button>

      <div className="task-form">
        <input name="task" placeholder="Task" value={taskInput.task} onChange={handleTaskChange} />
        <input name="deadline" type="date" value={taskInput.deadline} onChange={handleTaskChange} />
        <select name="status" value={taskInput.status} onChange={handleTaskChange}>
          <option>In Progress</option>
          <option>Paused</option>
          <option>Completed</option>
        </select>
        <input name="incentiveAmount" placeholder="Incentive Amount" value={taskInput.incentiveAmount} onChange={handleTaskChange} />
        <select name="incentiveStatus" value={taskInput.incentiveStatus} onChange={handleTaskChange}>
          <option>Paid</option>
          <option>Pending</option>
        </select>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Incentive</th>
            <th>Incentive Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, i) => (
            <tr key={i}>
              <td>{t.task}</td>
              <td>{t.deadline}</td>
              <td>{t.status}</td>
              <td>{t.incentiveAmount}</td>
              <td>{t.incentiveStatus}</td>
              <td>
                <button onClick={() => handleEdit(i)}>✏️</button>
                <button onClick={() => handleDelete(i)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="btn-group">
        <button onClick={handleSave}>Save</button>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
