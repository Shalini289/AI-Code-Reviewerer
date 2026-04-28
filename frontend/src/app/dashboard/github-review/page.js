"use client";

import { useState } from "react";
import { reviewGithubRepo } from "@/services/githubService";
import "@/styles/dashboard.css";

export default function GithubReviewPage() {
  const [repoUrl, setRepoUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!repoUrl.includes("github.com")) {
      alert("Enter valid GitHub URL");
      return;
    }

    try {
      setLoading(true);

      const data = await reviewGithubRepo(repoUrl);

      setResult(data);

    } catch {
      alert("Failed to fetch review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>GitHub Repo Review</h1>

      <input
        type="text"
        placeholder="https://github.com/user/repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <button onClick={handleReview}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="review-grid">

          <div className="review-card">
            <h3>📌 Summary</h3>
            <p>{result.summary}</p>
          </div>

          <div className="review-card">
            <h3>⭐ Score</h3>
            <p>{result.healthScore}/10</p>
          </div>

          <div className="review-card">
            <h3>⚡ Code Quality</h3>
            <p>{result.codeQuality}</p>
          </div>

          <div className="review-card">
            <h3>🏗 Architecture</h3>
            <p>{result.architecture}</p>
          </div>

          <div className="review-card">
            <h3>🔒 Security</h3>
            <p>{result.security}</p>
          </div>

          <div className="review-card">
            <h3>📄 Documentation</h3>
            <p>{result.documentation}</p>
          </div>

          <div className="review-card">
            <h3>🧩 Maintainability</h3>
            <p>{result.maintainability}</p>
          </div>

          <div className="review-card">
            <h3>👍 Strengths</h3>
            <ul>
              {(result.strengths || []).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="review-card">
            <h3>👎 Weaknesses</h3>
            <ul>
              {(result.weaknesses || []).map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>

          <div className="review-card full-width">
            <h3>🚀 Suggestions</h3>
            <ul>
              {(result.suggestions || []).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}