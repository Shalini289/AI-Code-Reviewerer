"use client";

import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import styles from "../styles/editor.module.css";
import { estimateComplexity } from "../utils/complexity";

export default function Home() {
 
  const [code, setCode] = useState("// Paste your code here");
const [review, setReview] = useState("");
const [language, setLanguage] = useState("javascript"); // ⭐ NEW
const [complexity, setComplexity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
  console.log("🔥 Button clicked");

  try {
    console.log("📤 Sending request...");

      setLoading(true);

    const detected = estimateComplexity(code);
setComplexity(detected);

    const res = await fetch(" https://code-reviewer-ia1w.onrender.com/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
  body: JSON.stringify({ code, language }),
    });

    console.log("📡 Fetch response received");

    const data = await res.json();
    console.log("✅ Parsed data:", data);

    setReview(data.review);
    setLoading(false);
  } catch (err) {
  console.error("❌ Fetch error:", err);
  setReview("Error connecting to server.");
  setLoading(false);
}
};

 return (
  <div className={styles.pageContainer}>
    <div className={styles.mainCard}>
      <h1 className={styles.title}>🚀 Smart Code Reviewer</h1>
      <p className={styles.subtitle}>
        AI-powered code analysis with static complexity detection
      </p>

      <CodeEditor
        code={code}
        setCode={setCode}
        language={language}
      />
<div className={styles.sectionDivider}></div>i
      <div className={styles.controlsRow}>
        <select
          className={styles.selectBox}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>

        <button
          className={styles.reviewButton}
          onClick={handleReview}
          disabled={loading}
          style={{
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "⏳ Analyzing..." : "Review Code"}
        </button>
      </div>

      {loading && (
        <div className={styles.spinnerText}>
          🔍 AI is reviewing your code...
        </div>
      )}

      {/* Complexity Box */}
      <div
        style={{
          marginTop: "20px",
          padding: "12px",
          backgroundColor: "#1f2937",
          color: "#22c55e",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
      >
        🧮 Estimated Complexity (Static): {complexity || "—"}
      </div>

      {/* AI Output */}
      <div className={styles.outputBox}>
        {review || "AI review will appear here..."}
      </div>
    </div>
  </div>
);
}