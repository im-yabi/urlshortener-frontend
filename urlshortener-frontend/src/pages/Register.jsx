import React, { useState } from "react";
import API from "../api";
import { saveToken } from "../auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ Combine first + last name before sending to backend
      const { data } = await API.post("/auth/register", {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
      });

      saveToken(data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg border-0 animate__animated animate__fadeInUp"
        style={{ width: "420px", background: "linear-gradient(135deg, #f8f9fa, #e0eafc)" }}
      >
        <div className="card-body p-4">
          <h2
            className="text-center fw-bold mb-4"
            style={{
              background: "linear-gradient(90deg, #43cea2, #185a9d)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            📝 Create Account
          </h2>

          {error && (
            <div className="alert alert-danger text-center py-2">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">First Name</label>
              <div className="input-group">
                <span className="input-group-text bg-success text-white">👤</span>
                <input
                  className="form-control shadow-sm"
                  name="firstName"
                  placeholder="Enter first name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Last Name</label>
              <div className="input-group">
                <span className="input-group-text bg-success text-white">👤</span>
                <input
                  className="form-control shadow-sm"
                  name="lastName"
                  placeholder="Enter last name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-success text-white">📧</span>
                <input
                  className="form-control shadow-sm"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-success text-white">🔑</span>
                <input
                  className="form-control shadow-sm"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>
              <small className="text-muted">
                Password must be at least 6 characters
              </small>
            </div>

            {/* Register Button */}
            <button
              className="btn w-100 mt-3 shadow-sm"
              style={{
                background: "linear-gradient(90deg, #43cea2, #185a9d)",
                border: "none",
                color: "white",
                fontWeight: "600",
              }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register ✨"}
            </button>
          </form>

          {/* Redirect to Login */}
          <p className="text-center mt-3">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                cursor: "pointer",
                color: "#185a9d",
                fontWeight: "bold",
              }}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
