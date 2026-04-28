"use client";

import { useState } from "react";
import { compareCode } from "@/services/compareService";
import "@/styles/dashboard.css";

export default function ComparePage() {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!code1.trim() || !code2.trim()) {
      alert("Enter both codes");
      return;
    }

    try {
      setLoading(true);
      const data = await compareCode({
        code1,
        code2,
        language,
      });
      setResult(data);
    } catch {
      alert("Comparison failed");
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

      <button onClick={handleCompare}>
        {loading ? "Comparing..." : "Compare"}
      </button>

      {result && (
        <div className="review-grid">

          <div className="review-card">
            <h3>🏆 Winner</h3>
            <p>{result.winner}</p>
          </div>

          <div className="review-card">
            <h3>📌 Reason</h3>
            <p>{result.reason}</p>
          </div>

          <div className="review-card">
            <h3>⚡ Performance</h3>
            <p>{result.comparison?.performance}</p>
          </div>

          <div className="review-card">
            <h3>📖 Readability</h3>
            <p>{result.comparison?.readability}</p>
          </div>

          <div className="review-card">
            <h3>✅ Best Practices</h3>
            <p>{result.comparison?.bestPractices}</p>
          </div>

          <div className="review-card">
            <h3>👍 Code 1 Pros</h3>
            <ul>
              {(result.pros?.code1 || []).map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="review-card">
            <h3>👍 Code 2 Pros</h3>
            <ul>
              {(result.pros?.code2 || []).map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="review-card">
            <h3>👎 Code 1 Cons</h3>
            <ul>
              {(result.cons?.code1 || []).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="review-card">
            <h3>👎 Code 2 Cons</h3>
            <ul>
              {(result.cons?.code2 || []).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="review-card full">
            <h3>🚀 Improvements</h3>
            <p><strong>Code 1:</strong></p>
            <ul>
              {(result.improvements?.code1 || []).map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>

            <p><strong>Code 2:</strong></p>
            <ul>
              {(result.improvements?.code2 || []).map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}