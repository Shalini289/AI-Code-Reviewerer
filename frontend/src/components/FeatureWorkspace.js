"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function FeatureWorkspace({
  title,
  description,
  defaultContext = "",
  tasks,
}) {
  const router = useRouter();
  const [context, setContext] = useState(defaultContext);
  const [selectedTask, setSelectedTask] = useState(tasks[0]?.id || "");
  const [copied, setCopied] = useState(false);

  const task = useMemo(
    () => tasks.find((item) => item.id === selectedTask) || tasks[0],
    [selectedTask, tasks]
  );

  const effectiveContext = useMemo(
    () => context.trim() || task?.example || "",
    [context, task]
  );

  const prompt = useMemo(() => {
    const parts = [task?.prompt || ""];

    if (effectiveContext.trim()) {
      parts.push(`Context:\n${effectiveContext.trim()}`);
    }

    return parts.filter(Boolean).join("\n\n");
  }, [effectiveContext, task]);

  const sendToReviewer = () => {
    localStorage.setItem(
      "aiReviewerDraft",
      JSON.stringify({
        code: effectiveContext,
        question: prompt,
        language: task?.language || "javascript",
      })
    );

    router.push("/dashboard/review");
  };

  const copyPrompt = async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const loadExample = () => {
    if (task?.example) setContext(task.example);
  };

  const clearContext = () => {
    setContext("");
  };

  return (
    <div className="feature-page">
      <div className="feature-hero">
        <div>
          <h1>{title}</h1>
          <p>{description || task?.summary}</p>
        </div>
        <div className="feature-actions">
          <button className="feature-button secondary" onClick={loadExample}>
            Load example
          </button>
          <button className="feature-button" onClick={sendToReviewer}>
            Open in Reviewer
          </button>
        </div>
      </div>

      <div className="feature-layout">
        <aside className="feature-menu">
          <span>Choose a lab task</span>
          {tasks.map((item) => (
            <button
              className={item.id === selectedTask ? "active" : ""}
              key={item.id}
              onClick={() => setSelectedTask(item.id)}
            >
              {item.label}
            </button>
          ))}
        </aside>

        <section className="feature-workbench">
          <div className="feature-guide">
            <div className="feature-guide-card">
              <span>Selected task</span>
              <h2>{task?.label}</h2>
              <p>{task?.summary}</p>
            </div>
            <div className="feature-guide-card">
              <span>Use this when</span>
              <p>{task?.whenToUse || "You want the AI to review this area and return practical next steps."}</p>
            </div>
            <div className="feature-guide-card">
              <span>What you get</span>
              <ul>
                {(task?.outputs || [
                  "Clear findings",
                  "Suggested fixes",
                  "Priority order",
                ]).map((output) => (
                  <li key={output}>{output}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="feature-input-panel">
            <div className="feature-context-label">
              <div>
                <span>Input</span>
                <strong>{task?.inputTitle || "Paste the code or project notes to analyze"}</strong>
              </div>
              <div className="feature-context-actions">
                <button className="feature-button secondary" onClick={loadExample}>
                  Load example
                </button>
                <button className="feature-button ghost" onClick={clearContext}>
                  Clear
                </button>
              </div>
            </div>
            <textarea
              rows="12"
              value={context}
              onChange={(event) => setContext(event.target.value)}
              placeholder={
                task?.inputHint ||
                "Paste code, repo notes, logs, architecture notes, or deployment context..."
              }
            />
            {!context.trim() && task?.example ? (
              <p className="feature-example-note">
                Tip: load the example to test this lab immediately.
              </p>
            ) : null}
          </div>

          <div className="feature-output">
            <div className="feature-output-header">
              <div>
                <span>AI prompt preview</span>
                <h2>{task?.label}</h2>
              </div>
              <button className="feature-button secondary" onClick={copyPrompt}>
                {copied ? "Copied" : "Copy Prompt"}
              </button>
            </div>
            <pre>{prompt}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}
