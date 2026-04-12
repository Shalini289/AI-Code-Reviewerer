import "@/styles/dashboard.css";

export default function Analyzer() {
  return (
    <div className="tool-page">
      <h1>Complexity Analyzer</h1>
      <textarea rows="12" placeholder="Paste algorithm here..."></textarea>
      <button>Analyze Complexity</button>
      <div className="output-box">
        <p>Time Complexity: O(n log n)</p>
        <p>Space Complexity: O(n)</p>
      </div>
    </div>
  );
}