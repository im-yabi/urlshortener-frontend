import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchUrls = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/url");
      setUrls(data);
    } catch (err) {
      console.error("❌ Fetch URLs error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        setError("⚠️ Session expired. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(err.response?.data?.message || "Failed to load URLs.");
      }
    } finally {
      setLoading(false);
    }
  };
  const shortenUrl = async (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) {
      setError("Please enter a valid URL.");
      return;
    }
    try {
      await API.post("/url/shorten", { originalUrl: inputUrl });
      setInputUrl("");
      fetchUrls();
    } catch (err) {
      console.error("❌ Shorten URL error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to shorten URL.");
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div
      className="container py-5"
      style={{
        background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
        minHeight: "100vh",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2
          className="fw-bold"
          style={{
            background: "linear-gradient(90deg, #ff6a00, #ee0979)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          📊 Your Dashboard
        </h2>
      </div>
      {error && (
        <div className="alert alert-danger text-center fw-semibold" role="alert">
          {error}
        </div>
      )}
      <div className="card p-4 shadow-lg mb-4 border-0">
        <h5 className="fw-bold mb-3">🔗 Shorten a New URL</h5>
        <form onSubmit={shortenUrl}>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Paste your long URL here..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-lg text-white"
              style={{
                background: "linear-gradient(90deg, #ff6a00, #ee0979)",
                fontWeight: "600",
                border: "none",
              }}
            >
              🚀 Shorten
            </button>
          </div>
        </form>
      </div>
      <div className="card p-4 shadow border-0">
        <h4 className="fw-bold mb-3">📌 Your Shortened URLs</h4>

        {loading ? (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 fw-semibold">Loading URLs...</p>
          </div>
        ) : urls.length === 0 ? (
          <p className="text-muted text-center">⚠️ No URLs shortened yet.</p>
        ) : (
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {urls.map((url) => (
                <tr key={url._id}>
                  <td className="text-truncate" style={{ maxWidth: "300px" }}>
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      {url.originalUrl}
                    </a>
                  </td>
                  <td>
                    <a
                      href={`http://localhost:5000/api/url/${url.shortId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="fw-bold text-primary"
                    >
                      {`http://localhost:5000/api/url/${url.shortId}`}
                    </a>
                  </td>
                  <td>
                    <span className="badge bg-success">{url.clicks}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
