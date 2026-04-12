import "@/styles/auth.css";

export default function Docs() {
  return (
    <div className="page-container">
      <h1>Documentation</h1>
      <div className="docs-section">
        <h2>Getting Started</h2>
        <p>Paste your code into the review workspace and click Analyze.</p>

        <h2>Supported Languages</h2>
        <ul>
          <li>JavaScript</li>
          <li>Python</li>
          <li>Java</li>
          <li>C++</li>
        </ul>

        <h2>Features</h2>
        <p>AI Code Review, Security Scan, Complexity Analyzer, GitHub Review.</p>
      </div>
    </div>
  );
}