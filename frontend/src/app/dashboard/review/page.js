"use client";

import { useState } from "react";
import { reviewCode } from "@/services/reviewService";
import ReviewResult from "@/components/ReviewResult";
import "@/styles/dashboard.css";

export default function ReviewPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReview = async () => {
    if (!code.trim()) {
      setError("Please enter code");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await reviewCode({
        code,
        language,
      });

      setResult(data);

    } catch (err) {
      setError("Review failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>AI Code Reviewer</h1>

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
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code..."
      />

      <button onClick={handleReview}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && <ReviewResult result={result} />}
    </div>
  );
}