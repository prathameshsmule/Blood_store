import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/admin logo.png";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || "https://bloodbank.store/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("कृपया ईमेल आणि पासवर्ड भरा.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/admin/login`, { email, password });
      localStorage.setItem("admin-token", res.data.token);
      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.response?.data?.message || "Login failed. कृपया माहिती तपासा.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <img src={logo} alt="Admin Logo" style={{ height: "70px" }} className="mb-2" />
          <h3 className="text-dark">Admin Login</h3>
        </div>

        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger small">{error}</div>}

          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-dark w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
