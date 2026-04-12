import "@/styles/dashboard.css";

export default function Compare() {
  return (
    <div className="tool-page">
      <h1>Compare Code</h1>
      <div className="compare-grid">
        <textarea rows="15" placeholder="Old Code"></textarea>
        <textarea rows="15" placeholder="New Code"></textarea>
      </div>
      <button>Compare</button>
    </div>
  );
}