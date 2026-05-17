"use client";

import { useState } from "react";
import { scanSecurity } from "@/services/securityService";
import "@/styles/dashboard.css";

function VulnerabilityList({ items }) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];

  if (!list.length) return <p>No vulnerabilities found.</p>;

  return list.map((item, index) => (
    <div className="finding-group" key={`${item.issue || "finding"}-${index}`}>
      <h4>
        {item.issue || "Security finding"} {item.severity ? `(${item.severity})` : ""}
      </h4>
      <p>{item.description || "No description returned."}</p>
      <p>Fix: {item.fix || "No fix returned."}</p>
    </div>
  ));
}

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

export default function SecurityPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScan = async () => {
    if (!code.trim()) {
      setError("Enter code before running the security scan.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await scanSecurity({
        code,
        language,
      });

      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Security scan failed. Please try a smaller snippet."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>Security Analyzer</h1>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </select>

      <textarea
        rows="12"
        placeholder="Paste your code..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={handleScan} disabled={loading}>
        {loading ? "Scanning..." : "Scan Security"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="review-grid">
          <div className="review-card">
            <h3>Risk Level</h3>
            <p>{result.riskLevel || "No risk level returned."}</p>
          </div>

          <div className="review-card">
            <h3>Summary</h3>
            <p>{result.summary || "No summary returned."}</p>
          </div>

          <div className="review-card full">
            <h3>Vulnerabilities</h3>
            <VulnerabilityList items={result.vulnerabilities} />
          </div>

          <div className="review-card">
            <h3>Best Practices</h3>
            <List items={result.bestPractices} />
          </div>

          <div className="review-card full-width">
            <h3>Secure Code</h3>
            <pre>{result.secureCodeExample || "No secure code example returned."}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
