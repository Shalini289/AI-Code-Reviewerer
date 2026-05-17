"use client";

import { useState } from "react";
import { compareCode } from "@/services/compareService";
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

export default function ComparePage() {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCompare = async () => {
    if (!code1.trim() || !code2.trim()) {
      setError("Enter both code snippets before comparing.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await compareCode({
        code1,
        code2,
        language,
      });

      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Comparison failed. Please try a smaller snippet."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>Code Compare</h1>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </select>

      <div className="compare-grid">
        <textarea
          placeholder="Code 1"
          value={code1}
          onChange={(e) => setCode1(e.target.value)}
        />
        <textarea
          placeholder="Code 2"
          value={code2}
          onChange={(e) => setCode2(e.target.value)}
        />
      </div>

      <button onClick={handleCompare} disabled={loading}>
        {loading ? "Comparing..." : "Compare"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="review-grid">
          <div className="review-card">
            <h3>Winner</h3>
            <p>{result.winner || "No winner selected."}</p>
          </div>

          <div className="review-card">
            <h3>Reason</h3>
            <p>{result.reason || "No reason returned."}</p>
          </div>

          <div className="review-card">
            <h3>Performance</h3>
            <p>{result.comparison?.performance || "No performance comparison."}</p>
          </div>

          <div className="review-card">
            <h3>Readability</h3>
            <p>{result.comparison?.readability || "No readability comparison."}</p>
          </div>

          <div className="review-card">
            <h3>Best Practices</h3>
            <p>{result.comparison?.bestPractices || "No best-practice comparison."}</p>
          </div>

          <div className="review-card">
            <h3>Code 1 Pros</h3>
            <List items={result.pros?.code1} />
          </div>

          <div className="review-card">
            <h3>Code 2 Pros</h3>
            <List items={result.pros?.code2} />
          </div>

          <div className="review-card">
            <h3>Code 1 Cons</h3>
            <List items={result.cons?.code1} />
          </div>

          <div className="review-card">
            <h3>Code 2 Cons</h3>
            <List items={result.cons?.code2} />
          </div>

          <div className="review-card full">
            <h3>Improvements</h3>
            <p>
              <strong>Code 1:</strong>
            </p>
            <List items={result.improvements?.code1} />

            <p>
              <strong>Code 2:</strong>
            </p>
            <List items={result.improvements?.code2} />
          </div>
        </div>
      )}
    </div>
  );
}
