import "@/styles/landing.css";

export default function AboutPage() {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <h1>
          About AI Code Reviewer
        </h1>

        <p>
          Revolutionizing code
          quality with
          AI-powered
          intelligent reviews.
        </p>
      </section>

      {/* Mission */}
      <section className="about-section">
        <h2>
          Our Mission
        </h2>

        <p>
          Our goal is to help
          developers write
          cleaner, faster, and
          more secure code
          through intelligent
          AI-powered review
          systems.
        </p>
      </section>

      {/* Features */}
      <section className="about-section">
        <h2>
          What We Offer
        </h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>
              ⚡ Instant AI Review
            </h3>

            <p>
              Get real-time code
              feedback in seconds.
            </p>
          </div>

          <div className="feature-card">
            <h3>
              🔒 Security Analysis
            </h3>

            <p>
              Detect security
              vulnerabilities in
              your code.
            </p>
          </div>

          <div className="feature-card">
            <h3>
              📈 Optimization
            </h3>

            <p>
              Improve
              performance and
              efficiency.
            </p>
          </div>

          <div className="feature-card">
            <h3>
              📚 Best Practices
            </h3>

            <p>
              Learn modern
              coding standards
              and practices.
            </p>
          </div>

        </div>
      </section>

      {/* Why Choose */}
      <section className="about-section">
        <h2>
          Why Choose Us?
        </h2>

        <p>
          Built for developers,
          by developers. Our
          platform combines
          speed, accuracy, and
          premium UI/UX to
          deliver a modern code
          review experience.
        </p>
      </section>

    </div>
  );
}