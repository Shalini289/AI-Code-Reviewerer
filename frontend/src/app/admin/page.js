import "@/styles/admin.css";

export default function Admin() {
  return (
    <div className="admin-dashboard">
      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <h3>Total Users</h3>
          <p>1,245</p>
        </div>

        <div className="admin-stat-card">
          <h3>Total Reviews</h3>
          <p>8,942</p>
        </div>

        <div className="admin-stat-card">
          <h3>Revenue</h3>
          <p>$12,430</p>
        </div>

        <div className="admin-stat-card">
          <h3>Active Subscriptions</h3>
          <p>427</p>
        </div>
      </section>

      <section className="admin-recent-box">
        <h2>Recent Platform Activity</h2>
        <div className="activity-item">New User Registered - 5 mins ago</div>
        <div className="activity-item">Subscription Purchased - 12 mins ago</div>
        <div className="activity-item">Review Submitted - 20 mins ago</div>
      </section>
    </div>
  );
}