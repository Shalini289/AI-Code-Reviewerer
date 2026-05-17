import Link from "next/link";
import "@/styles/landing.css";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="home">
        <section className="hero">
          <div className="hero-content">
            <h1>AI Powered Code Reviewer</h1>
            <p>
              Analyze, optimize, and improve your code instantly with AI-driven
              feedback, complexity analysis, and security suggestions.
            </p>
            <div className="hero-buttons">
              <Link href="/register" className="primary-btn">
                Get Started
              </Link>
              <Link href="/pricing" className="secondary-btn">
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="features">
          <h2>Code review workspace, not a blank editor</h2>
          <div className="feature-grid">
            <div className="home-feature-card">
              <span>Review</span>
              <h3>Instant Code Review</h3>
              <p>
                Find bugs, logic mistakes, style issues, and risky patterns with
                clear severity labels.
              </p>
            </div>
            <div className="home-feature-card">
              <span>Security</span>
              <h3>Security Detection</h3>
              <p>
                Scan for leaked secrets, unsafe queries, weak auth logic, and
                vulnerable coding practices.
              </p>
            </div>
            <div className="home-feature-card">
              <span>Performance</span>
              <h3>Complexity Analysis</h3>
              <p>
                Estimate time and space complexity, spot nested-loop problems,
                and get practical optimizations.
              </p>
            </div>
            <div className="home-feature-card">
              <span>Assistant</span>
              <h3>AI Suggestions</h3>
              <p>
                Explain code, generate tests, refactor functions, and produce
                readable documentation.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
