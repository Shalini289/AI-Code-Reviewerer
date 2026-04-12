import "@/styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-home">
      <section className="stats-grid">
        <div className="stat-card">
          <h3>Total Reviews</h3>
          <p>152</p>
        </div>

        <div className="stat-card">
          <h3>Saved Snippets</h3>
          <p>47</p>
        </div>

        <div className="stat-card">
          <h3>Security Issues Found</h3>
          <p>23</p>
        </div>

        <div className="stat-card">
          <h3>Current Plan</h3>
          <p>Pro</p>
        </div>
      </section>

      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-card">
          <p>Reviewed JavaScript Authentication Code</p>
          <span>2 hours ago</span>
        </div>
        <div className="activity-card">
          <p>Analyzed Python Sorting Algorithm</p>
          <span>5 hours ago</span>
        </div>
        <div className="activity-card">
          <p>Security Scan Completed on Login API</p>
          <span>Yesterday</span>
        </div>
      </section>
    </div>
  );
}