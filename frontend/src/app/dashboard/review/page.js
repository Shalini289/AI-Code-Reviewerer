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

export default function ReviewPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [question, setQuestion] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ideTheme, setIdeTheme] = useState("vs-dark");
  const [sandboxOutput, setSandboxOutput] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [sessionId] = useState(() =>
    Math.random().toString(36).slice(2, 10).toUpperCase()
  );

  const monacoLanguage = useMemo(
    () =>
      LANGUAGE_OPTIONS.find((item) => item.value === language)?.monaco ||
      "javascript",
    [language]
  );

  const sessionUrl =
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}/dashboard/review?session=${sessionId}`;

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
    } catch {
      setError("Review failed");
      return null;
    } finally {
      setLoading(false);
    }
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

  const copySessionLink = async () => {
    if (!navigator.clipboard || !sessionUrl) return;
    await navigator.clipboard.writeText(sessionUrl);
  };

  return (
    <div className={`tool-page premium-review ${ideTheme === "vs" ? "light-ide" : ""}`}>
      <h1>AI Code Reviewer</h1>

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
      </div>

      <div className="editor-shell">
        <MonacoEditor
          height="420px"
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

      <div className="premium-panels">
        <div className="premium-panel">
          <h3>Collaborative Review</h3>
          <p>Session {sessionId}</p>
          <button className="secondary-action" onClick={copySessionLink}>
            Copy session link
          </button>
        </div>

        <div className="premium-panel">
          <h3>Live Execution Sandbox</h3>
          <pre>{sandboxOutput || "Run JavaScript to see console output here."}</pre>
        </div>

        <div className="premium-panel">
          <h3>Developer Leaderboard</h3>
          {leaderboard.length ? (
            <ol>
              {leaderboard.map((entry) => (
                <li key={entry.id}>
                  <span>{entry.label}</span>
                  <strong>{entry.score}/100</strong>
                </li>
              ))}
            </ol>
          ) : (
            <p>No scores yet.</p>
          )}
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {result && <ReviewResult result={result} />}
    </div>
  );
}
