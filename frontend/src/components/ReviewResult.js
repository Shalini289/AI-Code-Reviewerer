export default function ReviewResult({
  result,
}) {
  return (
    <div className="review-results">

<div className="review-card">
        <h3>Summary</h3>

        <ul>
          {result?.summary
            ?.length > 0 ? (
            result.summary.map(
              (sec, i) => (
                <li key={i}>
                  {sec}
                </li>
              )
            )
          ) : (
            <li>
              No Summary
            </li>
          )}
        </ul>
      </div>

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
        <h3>Performance</h3>

        <ul>
          {result?.performance
            ?.length > 0 ? (
            result.performance.map(
              (sec, i) => (
                <li key={i}>
                  {sec}
                </li>
              )
            )
          ) : (
            <li>
              No Performance Issues
            </li>
          )}
        </ul>
      </div>

          <div className="review-card">
        <h3>Readability</h3>

        <ul>
          {result?.readibility
            ?.length > 0 ? (
            result.readibility.map(
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

<div className="review-card">
        <h3>Improvements</h3>

        <ul>
          {result?.improvements
            ?.length > 0 ? (
            result.improvements.map(
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