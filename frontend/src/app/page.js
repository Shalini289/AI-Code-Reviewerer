import Link from "next/link";
import "@/styles/landing.css";
import Navbar from "@/components/common/Navbar";
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
            <Link href="/register" className="primary-btn">Get Started</Link>
            <Link href="/pricing" className="secondary-btn">View Pricing</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="card">Instant Code Review</div>
          <div className="card">Security Detection</div>
          <div className="card">Complexity Analysis</div>
          <div className="card">AI Suggestions</div>
        </div>
      </section>
    </main>
    </>
  );
}