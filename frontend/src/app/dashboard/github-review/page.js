"use client";

import { useState } from "react";
import { reviewGithubRepo } from "@/services/githubService";

import "@/styles/dashboard.css";

export default function GithubReviewPage() {
  const [repoUrl, setRepoUrl] = useState("");
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    try {
      setLoading(true);

      const res = await reviewGithubRepo(repoUrl);

      console.log("REVIEW:", res);

      setReview(res);
    } catch (err) {
      console.log(err);
      alert("Failed to analyze repo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="github-page">
      <h1>GitHub Repo Review</h1>

      <input
        type="text"
        placeholder="https://github.com/username/repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <button onClick={handleReview}>
        {loading ? "Analyzing..." : "Analyze Repo"}
      </button>

      {/* RESULT UI */}
      {review && (
        <div className="review-grid">

          <div className="review-card">
            <h3>📌 Summary</h3>
            <p>{review.summary}</p>
          </div>
           <div className="review-card">
            <h3>Health Scoree</h3>
            <p>{review.healthScore}</p>
          </div>

          <div className="review-card">
            <h3>⚡ Code Quality</h3>
            <p>{review.codeQuality}</p>
          </div>

          <div className="review-card">
            <h3>🏗 Architecture</h3>
            <p>{review.architecture}</p>
          </div>

          <div className="review-card">
            <h3>🔒 Security</h3>
            <p>{review.security}</p>
          </div>
 <div className="review-card">
            <h3>Documentation</h3>
            <p>{review.documentation}</p>
          </div>

           <div className="review-card">
            <h3>Maintainability</h3>
            <p>{review.maintainability}</p>
          </div>
           <div className="review-card">
            <h3>Weaknesses</h3>
            <p>{review.weaknesses}</p>
          </div>
           <div className="review-card">
            <h3>Strengths</h3>
            <p>{review.strengths}</p>
          </div>
          <div className="review-card full-width">
            <h3>🚀 Suggestions</h3>

            <ul>
              {(review?.suggestions || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}