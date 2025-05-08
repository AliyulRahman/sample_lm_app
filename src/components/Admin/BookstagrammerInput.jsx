import { useEffect, useState } from "react";
import "./BookstagrammerInput.css";

export default function BookstagrammerInput({ user }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const storageKey = `bookstagrammer_tasks_${user.email}`;

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(storageKey)) || [];
    setTasks(savedTasks);
  }, [storageKey]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, newTask.trim()];
      setTasks(updatedTasks);
      localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
      setNewTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
  };

  return (
    <div className="bookstagrammer-container">
      <h3>Tasks for {user.name}</h3>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, idx) => (
          <li key={idx}>
            {task}
            <button onClick={() => handleDeleteTask(idx)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
