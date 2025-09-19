import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { getToken } from "./auth";

// 🔒 Private Route Wrapper
const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
};

// 🚀 App Component
const App = () => {
  return (
    <Router>
      <Navbar />

      <div className="container my-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Redirect root to login if not logged in */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch all unknown routes → 404 fallback */}
          <Route
            path="*"
            element={
              <div className="text-center mt-5">
                <h1 className="display-3 fw-bold text-danger">404</h1>
                <p className="lead">Oops! Page not found 🚧</p>
                <a href="/login" className="btn btn-primary">
                  🔑 Go to Login
                </a>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
