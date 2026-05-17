import "@/styles/landing.css";

export default function DocsPage() {
  return (
    <div className="docs-page">
      <div className="docs-header">
        <h1>Documentation</h1>
        <p>
          Learn how to use AI Code Reviewer and explore the main tools available
          across review, security, automation, and team workflows.
        </p>
      </div>

      <div className="docs-container">
        <div className="doc-card">
          <h2>Getting Started</h2>
          <p>
            Register or log in to access the dashboard and start reviewing code
            instantly.
          </p>
        </div>

        <div className="doc-card">
          <h2>AI Review</h2>
          <p>
            Paste code into the review page and the AI will analyze bugs,
            optimization opportunities, complexity, and best practices.
          </p>
        </div>

        <div className="doc-card">
          <h2>Security Scan</h2>
          <p>
            Use the security page to scan code for vulnerabilities, leaked
            secrets, and suspicious patterns.
          </p>
        </div>

        <div className="doc-card">
          <h2>Compare Code</h2>
          <p>
            Compare two snippets and find which version is clearer, safer, and
            more efficient.
          </p>
        </div>

        <div className="doc-card">
          <h2>Snippets</h2>
          <p>Save reusable code snippets for future review and reference.</p>
        </div>

        <div className="doc-card">
          <h2>Billing</h2>
          <p>
            Upgrade plans from the pricing page and manage your active plan from
            the dashboard billing section.
          </p>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h3>Is AI Review Free?</h3>
          <p>Yes, limited free reviews are available in the free plan.</p>
        </div>

        <div className="faq-item">
          <h3>Which Languages Are Supported?</h3>
          <p>JavaScript, Python, Java, C++, Go, Rust, and more.</p>
        </div>

        <div className="faq-item">
          <h3>Is My Code Secure?</h3>
          <p>
            Your code is processed through the backend review flow and is not
            shown publicly inside the app.
          </p>
        </div>
      </div>
    </div>
  );
}
