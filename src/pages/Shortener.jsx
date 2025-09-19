import React, { useState } from "react";
import API from "../api";

const Shortener = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    try {
      const { data } = await API.post("/url/shorten", { originalUrl: inputUrl });
      setShortUrl(`http://localhost:5000/api/url/${data.shortId}`);
    } catch (err) {
      console.error("❌ Shorten error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to shorten URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ width: "500px", background: "linear-gradient(135deg, #fdfbfb, #ebedee)" }}
      >
        <h3
          className="text-center mb-4 fw-bold"
          style={{
            background: "linear-gradient(90deg, #36d1dc, #5b86e5)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          🔗 URL Shortener
        </h3>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="url"
              className="form-control"
              placeholder="Enter a long URL"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Shortening..." : "Shorten 🚀"}
            </button>
          </div>
        </form>

        {shortUrl && (
          <div className="alert alert-success text-center mt-3">
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shortener;
