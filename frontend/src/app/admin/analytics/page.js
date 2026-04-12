import "@/styles/admin.css";

export default function Analytics() {
  return (
    <div className="admin-page">
      <h1>Analytics Overview</h1>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Daily Active Users</h3>
          <p>324</p>
        </div>

        <div className="analytics-card">
          <h3>Monthly Revenue</h3>
          <p>$5,230</p>
        </div>

        <div className="analytics-card">
          <h3>Total API Calls</h3>
          <p>43,892</p>
        </div>
      </div>
    </div>
  );
}