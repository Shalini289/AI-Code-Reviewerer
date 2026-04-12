import "@/styles/dashboard.css";

export default function Review() {
  return (
    <div className="tool-page">
      <h1>Code Review Workspace</h1>
      <textarea rows="15" placeholder="Paste your code here..."></textarea>
      <button>Analyze Code</button>
      <div className="output-box">
        <h3>AI Suggestions</h3>
        <p>Your reviewed code feedback will appear here.</p>
      </div>
    </div>
  );
}