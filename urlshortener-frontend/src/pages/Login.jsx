import React, { useState } from "react";
import API from "../api";
import { saveToken } from "../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      saveToken(data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg border-0 animate__animated animate__fadeInDown"
        style={{
          width: "400px",
          background: "linear-gradient(135deg, #f8f9fa, #e0eafc)",
        }}
      >
        <div className="card-body p-4">
          <h2
            className="text-center fw-bold mb-4"
            style={{
              background: "linear-gradient(90deg, #ff6a00, #ee0979)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            🔐 Welcome Back
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-primary text-white">
                  📧
                </span>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-primary text-white">
                  🔑
                </span>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

           <button
  className="btn w-100 mt-3 shadow-sm"
  style={{
    background: "linear-gradient(90deg, #ff6a00, #ee0979)",
    border: "none",
    color: "white",
    fontWeight: "600"
  }}
>
  Login 🚀
</button>

          </form>

          <p className="text-center mt-3">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{ cursor: "pointer", color: "#ee0979", fontWeight: "bold" }}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
