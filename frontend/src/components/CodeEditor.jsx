"use client";

import Editor from "@monaco-editor/react";
import styles from "../styles/editor.module.css";

const LANGUAGE_LABELS = {
  javascript: "JS",
  cpp:        "C++",
  java:       "Java",
  python:     "Py",
};

export default function CodeEditor({ code, setCode, language }) {
  const lineCount = code ? code.split("\n").length : 1;
  const langLabel = LANGUAGE_LABELS[language] ?? language;

  return (
    <div className={styles.editorContainer}>

      {/* ── Chrome bar ── */}
      <div className={styles.editorChrome}>
        <div className={styles.chromeDots}>
          <span className={`${styles.dot} ${styles.dotRed}`}    />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`}  />
        </div>

        <span className={styles.chromeTitle}>
          {lineCount} {lineCount === 1 ? "line" : "lines"}
        </span>

        <span className={styles.chromeBadge}>{langLabel}</span>
      </div>

      {/* ── Monaco editor ── */}
      <div className={styles.editorInner}>
        <Editor
          height="400px"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            fontSize: 13.5,
            fontFamily: "'DM Mono', 'Fira Code', monospace",
            fontLigatures: true,
            lineHeight: 22,
            padding: { top: 16, bottom: 16 },
            minimap: { enabled: false },
            scrollbar: {
              verticalScrollbarSize: 5,
              horizontalScrollbarSize: 5,
            },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            renderLineHighlight: "gutter",
            lineNumbersMinChars: 3,
            glyphMargin: false,
            folding: true,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            roundedSelection: true,
          }}
        />
      </div>

    </div>
  );
}