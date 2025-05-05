import React, { useState } from "react";
import API from "../utils/api";
import "../styles/login.css"; // Import the corresponding CSS
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("jwtToken", res.data.token);
      if (res?.status === 200) {
        navigate("/dashboard");
      }
      setMessage("Login successful");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="form-title">Login</h2>
        <input
          className="form-input"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="form-button" type="submit">
          Login
        </button>
        <p className="form-message">{message}</p>
      </form>
    </div>
  );
};

export default Login;
