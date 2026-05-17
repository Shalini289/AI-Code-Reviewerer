"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { reviewCode } from "@/services/reviewService";
import ReviewResult from "@/components/ReviewResult";
import "@/styles/dashboard.css";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript", monaco: "javascript" },
  { value: "python", label: "Python", monaco: "python" },
  { value: "java", label: "Java", monaco: "java" },
  { value: "cpp", label: "C++", monaco: "cpp" },
  { value: "go", label: "Go", monaco: "go" },
  { value: "rust", label: "Rust", monaco: "rust" },
];

const PERSONA_OPTIONS = [
  "Strict Senior Engineer",
  "Friendly Teacher",
  "Security Auditor",
  "Startup CTO",
  "Interviewer",
  "Debugging at 2 AM",
];

const NEXT_GEN_MODES = [
  {
    id: "bug-time-machine",
    label: "Bug Time Machine",
    question:
      "Run Bug Time Machine. Infer where this bug was probably introduced, what safeguard may have been removed, and which visible change pattern created the risk.",
  },
  {
    id: "mistake-fingerprint",
    label: "Mistake Fingerprint",
    question:
      "Create a Developer Mistake Fingerprint. Find repeated mistake patterns, private coaching tips, and focused practice areas.",
  },
  {
    id: "production-simulator",
    label: "Production Simulator",
    question:
      "Run a Production Failure Simulator. Predict likely crashes, risky inputs, timeouts, overload risks, and monitoring checks.",
  },
  {
    id: "debate",
    label: "Reviewer Debate",
    question:
      "Run Code Review Debate Mode. Let Security, Performance, and Maintainability reviewers argue, then give a final judge decision.",
  },
  {
    id: "invisible-risk",
    label: "Invisible Risk",
    question:
      "Run Invisible Risk Detector. Find hidden risks that are not syntax errors, including growth, data leakage, ordering, and environment assumptions.",
  },
  {
    id: "fix-confidence",
    label: "Fix Confidence",
    question:
      "Generate a Fix Confidence Score. Estimate confidence, behavior-change risk, required tests, and rollback notes.",
  },
  {
    id: "review-replay",
    label: "Review Replay",
    question:
      "Create a Review Replay timeline showing issue found, fix suggested, fix applied, and verification steps.",
  },
  {
    id: "personality",
    label: "Personality Mode",
    question:
      "Apply the selected AI Reviewer Personality Mode. Keep the review factual but adapt tone and explanation style.",
  },
  {
    id: "health-forecast",
    label: "Health Forecast",
    question:
      "Generate a Code Health Forecast. Predict maintainability pressure, files that should split soon, dependency risk, and future warnings.",
  },
  {
    id: "debug-2am",
    label: "Debugging at 2 AM",
    question:
      "Explain Like I am Debugging at 2 AM. Tell me what broke, why it broke, the exact line to check, and the fastest safe fix.",
  },
];

const SAMPLE_CODE = `function calculateTotal(items) {
  let total = 0;

  for (let i = 0; i <= items.length; i++) {
    total += items[i].price;
  }

  return total;
}`;

export default function ReviewPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [question, setQuestion] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ideTheme, setIdeTheme] = useState("vs-dark");
  const [personality, setPersonality] = useState(PERSONA_OPTIONS[0]);
  const [sandboxOutput, setSandboxOutput] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  const monacoLanguage = useMemo(
    () =>
      LANGUAGE_OPTIONS.find((item) => item.value === language)?.monaco ||
      "javascript",
    [language]
  );

  const latestScore = result?.premiumFeatures?.codeScore;

  useEffect(() => {
    const rawDraft = localStorage.getItem("aiReviewerDraft");
    if (!rawDraft) return;

    try {
      const draft = JSON.parse(rawDraft);
      setCode(draft.code || "");
      setQuestion(draft.question || "");
      setLanguage(draft.language || "javascript");
    } catch {
      setError("Could not load reviewer draft");
    } finally {
      localStorage.removeItem("aiReviewerDraft");
    }
  }, []);

  const runReview = async (mode = "analyze") => {
    if (!code.trim() && !screenshot) {
      setError("Please enter code or upload a code screenshot");
      return null;
    }

    try {
      setLoading(true);
      setError("");

      const data = await reviewCode({
        code,
        language,
        question,
        mode,
        personality,
        screenshotName: screenshot?.name || "",
        screenshotDataUrl: screenshot?.dataUrl || "",
      });

      setResult(data);

      const score = data.premiumFeatures?.codeScore?.overall;
      if (Number.isFinite(score)) {
        setLeaderboard((current) =>
          [
            {
              id: Date.now(),
              label:
                data.premiumFeatures?.leaderboard?.scoreLabel ||
                `${language.toUpperCase()} review`,
              score,
            },
            ...current,
          ]
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
        );
      }

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Review failed"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const runNextGenMode = (item) => {
    setQuestion(item.question);
    return runReview(item.id);
  };

  const handleApplyFixedCode = async () => {
    const data = await runReview("fix");
    const fixedCode = data?.premiumFeatures?.fixEntireFile?.fixedCode;

    if (fixedCode) setCode(fixedCode);
  };

  const handleApplyOptimizedCode = async () => {
    const data = await runReview("optimize");
    const optimizedCode =
      data?.premiumFeatures?.oneClickOptimization?.optimizedCode;

    if (optimizedCode) setCode(optimizedCode);
  };

  const handleRunSandbox = () => {
    if (language !== "javascript") {
      setSandboxOutput("Live browser execution is available for JavaScript only.");
      return;
    }

    setSandboxOutput("Running...");

    const workerSource = `
      const logs = [];
      const console = {
        log: (...args) => logs.push(args.map(String).join(" ")),
        error: (...args) => logs.push(args.map(String).join(" ")),
        warn: (...args) => logs.push(args.map(String).join(" "))
      };

      try {
        const result = Function("console", '"use strict";\\n' + ${JSON.stringify(code)})(console);
        if (result !== undefined) logs.push(String(result));
        self.postMessage({ ok: true, output: logs.join("\\n") || "Code ran without console output." });
      } catch (err) {
        self.postMessage({ ok: false, output: err.message });
      }
    `;

    const workerUrl = URL.createObjectURL(
      new Blob([workerSource], {
        type: "application/javascript",
      })
    );
    const worker = new Worker(workerUrl);
    const timeout = setTimeout(() => {
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
      setSandboxOutput("Execution stopped after 2 seconds.");
    }, 2000);

    worker.onmessage = (event) => {
      clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
      setSandboxOutput(event.data.output);
    };

    worker.onerror = (event) => {
      clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
      setSandboxOutput(event.message);
    };
  };

  const handleScreenshotUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setScreenshot(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setScreenshot({
        name: file.name,
        dataUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const loadSampleCode = () => {
    setCode(SAMPLE_CODE);
    setLanguage("javascript");
    setQuestion("Find bugs, explain the issue, and suggest the safest fix.");
    setPersonality(PERSONA_OPTIONS[0]);
    setResult(null);
    setError("");
    setSandboxOutput("");
  };

  const clearReviewer = () => {
    setCode("");
    setQuestion("");
    setScreenshot(null);
    setResult(null);
    setError("");
    setSandboxOutput("");
  };

  return (
    <div className={`tool-page premium-review ${ideTheme === "vs" ? "light-ide" : ""}`}>
      <div className="review-header">
        <div>
          <h1>AI Code Reviewer</h1>
          <p>Paste code, analyze issues, run JavaScript safely, then apply fixes or optimizations.</p>
        </div>

        <div className="review-header-actions">
          <button className="secondary-action" onClick={loadSampleCode}>
            Load sample
          </button>
          <button className="secondary-action" onClick={clearReviewer}>
            Clear
          </button>
        </div>
      </div>

      <div className="review-workspace">
        <section className="review-primary">
          <div className="premium-toolbar">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGE_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <select
              value={ideTheme}
              onChange={(e) => setIdeTheme(e.target.value)}
            >
              <option value="vs-dark">Dark IDE</option>
              <option value="vs">Light IDE</option>
            </select>

            <select
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
            >
              {PERSONA_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="editor-shell">
            <MonacoEditor
              height="560px"
              language={monacoLanguage}
              theme={ideTheme}
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                automaticLayout: true,
              }}
            />
          </div>

          <textarea
            rows="3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder='Ask the AI pair programmer: "What should I build next?", "Can this be optimized?", or "Find vulnerabilities"'
          />

          <div className="next-gen-panel">
            <div>
              <h2>Next-gen Review Modes</h2>
              <p>Run one focused feature or use Analyze for the full review.</p>
            </div>
            <div className="next-gen-actions">
              {NEXT_GEN_MODES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => runNextGenMode(item)}
                  disabled={loading}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleScreenshotUpload}
          />

          {screenshot && (
            <p className="upload-note">Uploaded screenshot: {screenshot.name}</p>
          )}

          <div className="premium-actions">
            <button onClick={() => runReview("analyze")}>
              {loading ? "Analyzing..." : "Analyze"}
            </button>
            <button onClick={handleApplyFixedCode} disabled={loading}>
              Fix Entire File
            </button>
            <button onClick={handleApplyOptimizedCode} disabled={loading}>
              One-click Optimize
            </button>
            <button onClick={handleRunSandbox} disabled={loading}>
              Run JS Sandbox
            </button>
          </div>
        </section>

        <aside className="review-side">
          <div className="premium-panel">
            <h3>Review Status</h3>
            <div className="review-status-list">
              <div>
                <span>Language</span>
                <strong>{LANGUAGE_OPTIONS.find((item) => item.value === language)?.label}</strong>
              </div>
              <div>
                <span>Code size</span>
                <strong>{code.length} chars</strong>
              </div>
              <div>
                <span>Mode</span>
                <strong>{loading ? "Running" : result ? "Completed" : "Ready"}</strong>
              </div>
              <div>
                <span>Personality</span>
                <strong>{personality}</strong>
              </div>
            </div>
          </div>

          <div className="premium-panel">
            <h3>Live Execution Sandbox</h3>
            <pre>{sandboxOutput || "Run JavaScript to see console output here."}</pre>
          </div>

          <div className="premium-panel">
            <h3>Latest Score</h3>
            {latestScore ? (
              <div className="review-score-panel">
                <strong>{latestScore.overall ?? 0}/100</strong>
                <p>{latestScore.summary || "Score generated from the latest review."}</p>
              </div>
            ) : (
              <p>Run Analyze to generate correctness, security, performance, and readability scores.</p>
            )}
          </div>

          {leaderboard.length > 0 && (
            <div className="premium-panel">
              <h3>Top Local Scores</h3>
              <ol>
                {leaderboard.map((entry) => (
                  <li key={entry.id}>
                    <span>{entry.label}</span>
                    <strong>{entry.score}/100</strong>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </aside>
      </div>

      {error && <p className="error">{error}</p>}

      {result && <ReviewResult result={result} />}
    </div>
  );
}
