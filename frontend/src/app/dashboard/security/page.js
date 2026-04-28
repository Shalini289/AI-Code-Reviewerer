"use client";

import { useState } from "react";
import { scanSecurity } from "@/services/securityService";
import "@/styles/dashboard.css";

export default function SecurityPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!code.trim()) {
      alert("Enter code first");
      return;
    }

    try {
      setLoading(true);

      const data = await scanSecurity({
        code,
        language,
      });

      setResult(data);

    } catch {
      alert("Scan failed");
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

      <button onClick={handleScan}>
        {loading ? "Scanning..." : "Scan Security"}
      </button>

      {result && (
        <div className="review-grid">

          <div className="review-card">
            <h3>🚨 Risk Level</h3>
            <p>{result.riskLevel}</p>
          </div>

          <div className="review-card">
            <h3>📌 Summary</h3>
            <p>{result.summary}</p>
          </div>

          <div className="review-card full">
            <h3>🐞 Vulnerabilities</h3>

            {(result.vulnerabilities || []).length === 0 ? (
              <p>No vulnerabilities found</p>
            ) : (
              result.vulnerabilities.map((v, i) => (
                <div key={i}>
                  <strong>{v.issue}</strong> ({v.severity})
                  <p>{v.description}</p>
                  <p>Fix: {v.fix}</p>
                  <hr />
                </div>
              ))
            )}
          </div>

          <div className="review-card ">
            <h3>✅ Best Practices</h3>
            <ul>
              {(result.bestPractices || []).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="review-card full-width">
            <h3>🔐 Secure Code</h3>
            <pre>{result.secureCodeExample}</pre>
          </div>

        </div>
      )}
    </div>
  );
}