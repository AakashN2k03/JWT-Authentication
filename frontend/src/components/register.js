import React, { useState } from "react";
import API from "../utils/api";
import "../styles/register.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      console.log("res: ", res?.status);
      if (res?.status === 201) {
        navigate("/login");
      }
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  const handle_login_page = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>
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
          Register
        </button>
        <div className="login">
          Already have an account
          <button onClick={handle_login_page}>SIGN IN</button>
        </div>
        <p className="form-message">{message}</p>
      </form>
    </div>
  );
};

export default Register;
