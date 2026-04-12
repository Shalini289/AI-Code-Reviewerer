import "@/styles/dashboard.css";

export default function GithubReview() {
  return (
    <div className="tool-page">
      <h1>GitHub Repository Review</h1>
      <input type="text" placeholder="Enter GitHub Repository URL" />
      <button>Analyze Repository</button>

      <div className="output-box">
        <h3>Repository Insights</h3>
        <p>Architecture, best practices, and optimization suggestions appear here.</p>
      </div>
    </div>
  );
}