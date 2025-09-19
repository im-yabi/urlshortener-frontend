import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { getToken } from "./auth";

// Private route wrapper
const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
};

// Simple 404 Page
const NotFound = () => (
  <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
    <h1 className="display-3 fw-bold animate__animated animate__shakeX">🚨 404</h1>
    <p className="lead">Oops! The page you’re looking for doesn’t exist.</p>
    <a href="/login" className="btn btn-primary mt-3">
      🔑 Go to Login
    </a>
  </div>
);

const App = () => {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
