import React from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
      style={{
        background: "linear-gradient(135deg, #ff6a00, #ee0979)",
        color: "white",
      }}
    >
      {/* Hero Section */}
      <h1 className="display-3 fw-bold animate__animated animate__fadeInDown">
        🚀 URL Shortener
      </h1>
      <p className="lead animate__animated animate__fadeInUp animate__delay-1s">
        Shorten your links. Track your clicks. Simplify your sharing.  
      </p>

      {/* CTA Buttons */}
      <div className="mt-4">
        <button
          className="btn btn-light btn-lg mx-2 shadow"
          onClick={() => navigate("/login")}
        >
          🔑 Login
        </button>
        <button
          className="btn btn-dark btn-lg mx-2 shadow"
          onClick={() => navigate("/register")}
        >
          📝 Register
        </button>
      </div>

      {/* Info Section */}
      <div className="mt-5 container">
        <div className="row">
          <div className="col-md-4">
            <h3>⚡ Fast</h3>
            <p>Instantly generate short links for easy sharing.</p>
          </div>
          <div className="col-md-4">
            <h3>📊 Trackable</h3>
            <p>Monitor link clicks and track performance.</p>
          </div>
          <div className="col-md-4">
            <h3>🌍 Shareable</h3>
            <p>Works everywhere — social media, emails, or chats.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
