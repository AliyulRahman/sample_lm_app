import { useState } from "react";
import UsersTab from "./UsersTab";
import HomeTab from "./HomeTab";
import AuthorDashboardTab from "./AuthorDashboardTab";
import BookstagrammerDashboardTab from "./BookstagrammerDashboardTab";
import ServicesTab from "./ServicesTab";
import "./Admin.css";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <div className="admin-tabs">
        <button
          className={activeTab === "home" ? "active" : ""}
          onClick={() => setActiveTab("home")}
        >
          Home
        </button>
        <button
          className={activeTab === "authorDashboard" ? "active" : ""}
          onClick={() => setActiveTab("authorDashboard")}
        >
          Author Dashboard
        </button>
        <button
          className={activeTab === "bookstagrammarDashboard" ? "active" : ""}
          onClick={() => setActiveTab("bookstagrammarDashboard")}
        >
          Bookstagrammer Dashboard
        </button>
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={activeTab === "services" ? "active" : ""}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "users" && <UsersTab />}
        {activeTab === "home" && <HomeTab />}
        {activeTab === "authorDashboard" && <AuthorDashboardTab />}
        {activeTab === "bookstagrammarDashboard" && (
          <BookstagrammerDashboardTab />
        )}
        {activeTab === "services" && <ServicesTab />}
      </div>
    </div>
  );
}
