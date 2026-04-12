import "@/styles/dashboard.css";

export default function Security() {
  return (
    <div className="tool-page">
      <h1>Security Scanner</h1>
      <textarea rows="12" placeholder="Paste code to scan..."></textarea>
      <button>Scan Security</button>
      <div className="output-box">
        <p>⚠ SQL Injection Risk Detected</p>
        <p>⚠ Missing Input Validation</p>
      </div>
    </div>
  );
}