import "@/styles/dashboard.css";

export default function Settings() {
  return (
    <div className="tool-page">
      <h1>Settings</h1>

      <div className="settings-card">
        <label>Dark Mode</label>
        <input type="checkbox" />
      </div>

      <div className="settings-card">
        <label>Email Notifications</label>
        <input type="checkbox" />
      </div>

      <div className="settings-card">
        <label>Auto Save Reviews</label>
        <input type="checkbox" />
      </div>
    </div>
  );
}