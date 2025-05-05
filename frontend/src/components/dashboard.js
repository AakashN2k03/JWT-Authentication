import React, { useState } from "react";
import API from "../utils/api";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchProtectedData = async () => {
    try {
      const res = await API.get("/auth/protected");
      console.log("result: ", res);
      setMessage(res.data.message || "You are authenticated!");
    } catch (err) {
      setMessage("Not authorized");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <button className="logout-button" onClick={handleLogout}>
        LOGOUT
      </button>
      <div className="dashboard-card">
        <h2 className="dashboard-title">Dashboard</h2>
        <button className="dashboard-button" onClick={fetchProtectedData}>
          Get Protected Data
        </button>
        <p className="dashboard-message">{message}</p>
      </div>
    </div>
  );
};

export default Dashboard;
