"use client";

import { useState } from "react";
import { reviewGithubRepo } from "@/services/githubService";
import "@/styles/dashboard.css";

function List({ items }) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];

  if (!list.length) return <p>No items found.</p>;

  return (
    <ul>
      {list.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
}

function Card({ title, children, fullWidth = false }) {
  return (
    <div className={`review-card ${fullWidth ? "full-width" : ""}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default function GithubReviewPage() {
  const [repoUrl, setRepoUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const automation = result?.githubAutomation || {};
  const cicd = result?.cicdIntegration || {};

  const handleReview = async () => {
    if (!repoUrl.includes("github.com")) {
      setError("Enter a valid GitHub repository URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await reviewGithubRepo(repoUrl);

      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to fetch repository review."
      );
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

      <button onClick={handleReview} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="review-grid">
          <Card title="Summary">
            <p>{result.summary}</p>
          </Card>

          <Card title="Score">
            <p>{result.healthScore}/10</p>
          </Card>

          <Card title="Code Quality">
            <p>{result.codeQuality}</p>
          </Card>

          <Card title="Architecture">
            <p>{result.architecture}</p>
          </Card>

          <Card title="Security">
            <p>{result.security}</p>
          </Card>

          <Card title="Documentation">
            <p>{result.documentation}</p>
          </Card>

          <Card title="Maintainability">
            <p>{result.maintainability}</p>
          </Card>

          <Card title="Strengths">
            <List items={result.strengths} />
          </Card>

          <Card title="Weaknesses">
            <List items={result.weaknesses} />
          </Card>

          <Card title="Suggestions" fullWidth>
            <List items={result.suggestions} />
          </Card>

          <Card title="Pull Request Automation">
            <List items={automation.pullRequestReview} />
          </Card>

          <Card title="Commit Comments">
            <List items={automation.commitComments} />
          </Card>

          <Card title="Quality Trends">
            <List items={automation.qualityTrends} />
          </Card>

          <Card title="Deployment Review">
            <List items={cicd.deploymentReview} />
          </Card>

          <Card title="Push Blockers">
            <List items={cicd.pushBlockers} />
          </Card>

          <Card title="CI/CD Pipeline Steps" fullWidth>
            <List items={cicd.pipelineSteps} />
          </Card>
        </div>
      )}
    </div>
  );
}
