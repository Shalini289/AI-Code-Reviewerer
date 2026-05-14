"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function FeatureWorkspace({
  title,
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

  const prompt = useMemo(() => {
    const parts = [task?.prompt || ""];

    if (context.trim()) {
      parts.push(`Context:\n${context.trim()}`);
    }

    return parts.filter(Boolean).join("\n\n");
  }, [context, task]);

  const sendToReviewer = () => {
    localStorage.setItem(
      "aiReviewerDraft",
      JSON.stringify({
        code: context,
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

  return (
    <div className="feature-page">
      <div className="feature-hero">
        <div>
          <h1>{title}</h1>
          <p>{task?.summary}</p>
        </div>
        <button onClick={sendToReviewer}>Open in Reviewer</button>
      </div>

      <div className="feature-layout">
        <aside className="feature-menu">
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
          <textarea
            rows="10"
            value={context}
            onChange={(event) => setContext(event.target.value)}
            placeholder="Paste code, repo notes, logs, architecture notes, or deployment context..."
          />

          <div className="feature-output">
            <div className="feature-output-header">
              <h2>{task?.label}</h2>
              <button onClick={copyPrompt}>{copied ? "Copied" : "Copy Prompt"}</button>
            </div>
            <pre>{prompt}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}
