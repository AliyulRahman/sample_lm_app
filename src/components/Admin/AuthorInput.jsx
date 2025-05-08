import { useEffect, useState } from "react";
import "./AuthorInput.css";

export default function AuthorInput({ user }) {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");

  const storageKey = `author_projects_${user.email}`;

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem(storageKey)) || [];
    setProjects(savedProjects);
  }, [storageKey]);

  const handleAddProject = () => {
    if (newProject.trim()) {
      const updated = [...projects, newProject.trim()];
      setProjects(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setNewProject("");
    }
  };

  const handleDeleteProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  return (
    <div className="author-container">
      <h3>Projects for {user.name}</h3>
      <div className="project-input">
        <input
          type="text"
          placeholder="Add a new project..."
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button onClick={handleAddProject}>Add</button>
      </div>
      <ul className="project-list">
        {projects.map((project, idx) => (
          <li key={idx}>
            {project}
            <button onClick={() => handleDeleteProject(idx)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
