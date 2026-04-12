import "@/styles/dashboard.css";

export default function Billing() {
  return (
    <div className="tool-page">
      <h1>Billing & Subscription</h1>

      <div className="billing-card">
        <h2>Current Plan: Pro</h2>
        <p>$19/month</p>
        <button>Upgrade Plan</button>
      </div>

      <div className="billing-card">
        <h3>Payment History</h3>
        <p>March 2026 - $19 Paid</p>
        <p>February 2026 - $19 Paid</p>
      </div>
    </div>
  );
}