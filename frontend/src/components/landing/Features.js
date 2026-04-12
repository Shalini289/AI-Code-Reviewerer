export default function Features() {
  const features = [
    "AI Code Review",
    "Complexity Analysis",
    "Security Scanner",
    "GitHub Repo Review",
  ];

  return (
    <section className="features">
      <h2>Features</h2>

      <div className="feature-grid">
        {features.map((feature, i) => (
          <div key={i} className="card">
            {feature}
          </div>
        ))}
      </div>
    </section>
  );
}