export default function ReviewResult({ result }) {
  if (!result) return null;

  return (
    <div className="review-grid">

      <div className="review-card">
        <h3>📌 Summary</h3>
        <p>{result.summary || "No summary"}</p>
      </div>

      <div className="review-card">
        <h3>🐞 Bugs</h3>
        <ul>
          {(result.bugs || []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="review-card">
        <h3>⚡ Performance</h3>
        <p>{result.performance || "N/A"}</p>
      </div>

      <div className="review-card">
        <h3>📖 Readability</h3>
        <p>{result.readability || "N/A"}</p>
      </div>

      <div className="review-card">
        <h3>✅ Best Practices</h3>
        <ul>
          {(result.bestPractices || []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="review-card">
        <h3>🔒 Security</h3>
        <p>{result.security || "N/A"}</p>
      </div>

      <div className="review-card full-width">
        <h3>🚀 Improvements</h3>
        <ul>
          {(result.improvements || []).map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}