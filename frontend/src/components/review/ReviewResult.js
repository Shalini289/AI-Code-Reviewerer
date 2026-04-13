export default function ReviewResult({
  result,
}) {
  return (
    <div className="review-results">

      <div className="review-card bugs">
        <h3>🐛 Bugs</h3>

        <ul>
          {result?.bugs?.length > 0 ? (
            result.bugs.map(
              (bug, i) => (
                <li key={i}>
                  {bug}
                </li>
              )
            )
          ) : (
            <li>No Bugs Found</li>
          )}
        </ul>
      </div>

      <div className="review-card">
        <h3>⚡ Optimizations</h3>

        <ul>
          {result?.optimizations
            ?.length > 0 ? (
            result.optimizations.map(
              (opt, i) => (
                <li key={i}>
                  {opt}
                </li>
              )
            )
          ) : (
            <li>
              No Suggestions
            </li>
          )}
        </ul>
      </div>

      <div className="review-card">
        <h3>🔒 Security</h3>

        <ul>
          {result?.security
            ?.length > 0 ? (
            result.security.map(
              (sec, i) => (
                <li key={i}>
                  {sec}
                </li>
              )
            )
          ) : (
            <li>
              No Security Issues
            </li>
          )}
        </ul>
      </div>

      <div className="review-card">
        <h3>
          📘 Best Practices
        </h3>

        <ul>
          {result?.bestPractices
            ?.length > 0 ? (
            result.bestPractices.map(
              (bp, i) => (
                <li key={i}>
                  {bp}
                </li>
              )
            )
          ) : (
            <li>
              No Suggestions
            </li>
          )}
        </ul>
      </div>

      <div className="complexity-box">
        <span>
          Time:
          {result?.complexity
            ?.time || "N/A"}
        </span>

        <span>
          Space:
          {result?.complexity
            ?.space || "N/A"}
        </span>
      </div>

    </div>
  );
}