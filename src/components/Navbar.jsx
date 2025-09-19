import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, getToken } from "../auth";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!getToken();

  return (
    <nav
      className="navbar navbar-expand-lg shadow-lg p-3"
      style={{ background: "linear-gradient(90deg, #ff6a00, #ee0979)" }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold text-white animate__animated animate__pulse animate__infinite"
          to="/"
        >
          🚀 URL Shortener
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {isLoggedIn ? (
              <>
                <li className="nav-item me-2">
                  <Link className="nav-link text-white fw-semibold" to="/dashboard">
                    📊 Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-light btn-sm shadow-sm fw-semibold"
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link className="nav-link text-white fw-semibold" to="/login">
                    🔑 Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold" to="/register">
                    📝 Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
