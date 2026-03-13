"use client";

import Editor from "@monaco-editor/react";
import styles from "../styles/editor.module.css";

export default function CodeEditor({ code, setCode, language }) {
  return (
    <div className={styles.editorContainer}>
      <Editor
        height="400px"
       language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}