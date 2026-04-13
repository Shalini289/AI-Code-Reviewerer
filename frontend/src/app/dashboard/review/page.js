"use client";

import { useState } from "react";
import "@/styles/dashboard.css";
import { reviewCode } from "@/services/reviewService";
import ReviewResult from"@/components/review/ReviewResult"
export default function ReviewPage() {
  const [code, setCode] =
    useState("");

  const [language, setLanguage] =
    useState("javascript");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState("");

  const [error, setError] =
    useState("");

  const handleReview =
    async () => {
      if (!code.trim()) {
        setError(
          "Please enter code first."
        );
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data =
          await reviewCode({
            code,
            language,
          });

        setResult(data.result);

      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Review failed"
        );

      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="tool-page">
      <h1>
        AI Code Reviewer
      </h1>

      <p>
        Paste your code below
        and get instant AI
        feedback.
      </p>

      <select
        value={language}
        onChange={(e) =>
          setLanguage(
            e.target.value
          )
        }
      >
        <option value="javascript">
          JavaScript
        </option>

        <option value="python">
          Python
        </option>

        <option value="java">
          Java
        </option>

        <option value="cpp">
          C++
        </option>
      </select>

      <textarea
        rows="15"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) =>
          setCode(
            e.target.value
          )
        }
      />

      <button
        onClick={
          handleReview
        }
      >
        {loading
          ? "Reviewing..."
          : "Analyze Code"}
      </button>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {result && (
        <div className="output-box">
          <h2>
            Review Result
          </h2>

          <pre>
            {result && (
  <ReviewResult
    result={result}
  />
)}
          </pre>
        </div>
      )}
    </div>
  );
}