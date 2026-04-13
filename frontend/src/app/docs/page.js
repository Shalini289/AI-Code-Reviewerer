import "@/styles/landing.css";

export default function DocsPage() {
  return (
    <div className="docs-page">

      <div className="docs-header">
        <h1>
          Documentation
        </h1>

        <p>
          Learn how to use AI
          Code Reviewer and
          explore all
          available features.
        </p>
      </div>

      <div className="docs-container">

        <div className="doc-card">
          <h2>
            🚀 Getting Started
          </h2>

          <p>
            Register/Login to
            access dashboard
            and start reviewing
            code instantly.
          </p>
        </div>

        <div className="doc-card">
          <h2>
            🧠 AI Review
          </h2>

          <p>
            Paste your code in
            review page and AI
            will analyze it for
            bugs,
            optimization, and
            best practices.
          </p>
        </div>

        <div className="doc-card">
          <h2>
            🔒 Security Scan
          </h2>

          <p>
            Use Security Page
            to scan code for
            vulnerabilities
            and threats.
          </p>
        </div>

        <div className="doc-card">
          <h2>
            ⚡ Compare Code
          </h2>

          <p>
            Compare two code
            snippets and find
            which is better
            with AI-powered
            comparison.
          </p>
        </div>

        <div className="doc-card">
          <h2>
            📂 Snippets
          </h2>

          <p>
            Save your reusable
            code snippets for
            future use.
          </p>
        </div>

        <div className="doc-card">
          <h2>
            💳 Billing
          </h2>

          <p>
            Upgrade plans from
            pricing page and
            manage billing in
            dashboard billing
            section.
          </p>
        </div>

      </div>

      <div className="faq-section">
        <h2>
          Frequently Asked
          Questions
        </h2>

        <div className="faq-item">
          <h3>
            Is AI Review Free?
          </h3>

          <p>
            Yes, limited free
            reviews are
            available in free
            plan.
          </p>
        </div>

        <div className="faq-item">
          <h3>
            Which Languages Are
            Supported?
          </h3>

          <p>
            JavaScript,
            Python, Java, C++,
            and many more.
          </p>
        </div>

        <div className="faq-item">
          <h3>
            Is My Code Secure?
          </h3>

          <p>
            Yes, your code is
            processed securely
            and privately.
          </p>
        </div>

      </div>

    </div>
  );
}