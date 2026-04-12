import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <h1>Review Code Smarter With AI</h1>
      <p>
        Improve code quality instantly with AI-powered review, analysis and
        security scanning.
      </p>

      <div className="hero-buttons">
        <Link href="/register" className="primary-btn">
          Start Free
        </Link>

        <Link href="/pricing" className="secondary-btn">
          Pricing
        </Link>
      </div>
    </section>
  );
}