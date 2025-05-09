import { useState, useEffect } from "react";
import "./AuthorInput.css";

const STORAGE_KEY = "authorDetails";

export default function AuthorInput({ user, onClose }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { data: [] };
    const userEntry = savedData.data.find((entry) => entry.userEmail === user.email);
    if (userEntry) {
      setTasks(userEntry.tasks);
    }
  }, [user]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleSave = () => {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { data: [] };
    const existingIndex = savedData.data.findIndex(entry => entry.userEmail === user.email);

    if (existingIndex !== -1) {
      savedData.data[existingIndex].tasks = tasks;
    } else {
      savedData.data.push({ userEmail: user.email, tasks });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
    onClose();
  };

  return (
    <div className="popup-container">
      <h3>Author Tasks for {user.name}</h3>
      <ul className="task-list">
        {tasks.map((task, idx) => (
          <li key={idx}>{task}</li>
        ))}
      </ul>
      <div className="task-input-row">
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <div className="popup-buttons">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
