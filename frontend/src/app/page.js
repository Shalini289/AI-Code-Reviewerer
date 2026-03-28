"use client";

import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import styles from "../styles/editor.module.css";
import { estimateComplexity } from "../utils/complexity";

export default function Home() {
  const [code, setCode] = useState("// Paste your code here");
  const [review, setReview] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [complexity, setComplexity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    console.log("🔥 Button clicked");

    try {
      console.log("📤 Sending request...");
      setLoading(true);

      const detected = estimateComplexity(code);
      setComplexity(detected);

      const res = await fetch("https://code-reviewer-ia1w.onrender.com/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "cpp",        label: "C++" },
    { value: "java",       label: "Java" },
    { value: "python",     label: "Python" },
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainCard}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <div className={styles.titleIcon}>⬡</div>
            <h1 className={styles.title}>
              <span className={styles.titleAccent}>code</span>
              {"_"}reviewer
            </h1>
          </div>
          <p className={styles.subtitle}>
            AI-powered analysis · static complexity detection
          </p>
        </div>

        {/* ── Editor label ── */}
        <div className={styles.sectionLabel}>source</div>

        <CodeEditor
          code={code}
          setCode={setCode}
          language={language}
        />

        <div className={styles.sectionDivider} />

        {/* ── Controls ── */}
        <div className={styles.controlsRow}>
          <select
            className={styles.selectBox}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>

          <button
            className={styles.reviewButton}
            onClick={handleReview}
            disabled={loading}
          >
            {loading ? "Analyzing…" : "→ Run Review"}
          </button>
        </div>

        {/* ── Analyzing indicator ── */}
        {loading && (
          <div className={styles.spinnerText}>
            <span className={styles.spinnerDot} />
            <span className={styles.spinnerDot} />
            <span className={styles.spinnerDot} />
            AI is reviewing your code
          </div>
        )}

        {/* ── Complexity ── */}
        <div className={styles.complexityBox}>
          <span className={styles.complexityIcon}>◈</span>
          <span className={styles.complexityLabel}>Complexity</span>
          <span className={complexity ? styles.complexityValue : `${styles.complexityValue} ${styles.complexityEmpty}`}>
            {complexity || "—"}
          </span>
        </div>

        {/* ── Output label ── */}
        <div className={styles.sectionLabel}>output</div>

        {/* ── AI Output ── */}
        <div className={`${styles.outputBox} ${review ? styles.outputBoxActive : ""}`}>
          {review
            ? review
            : <span className={styles.outputPlaceholder}>AI review will appear here…</span>
          }
        </div>

      </div>
    </div>
  );
}