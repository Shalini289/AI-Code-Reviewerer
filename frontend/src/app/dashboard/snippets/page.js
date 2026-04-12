import "@/styles/dashboard.css";

export default function Snippets() {
  return (
    <div className="tool-page">
      <h1>Saved Snippets</h1>
      <div className="snippet-card">JWT Authentication Template</div>
      <div className="snippet-card">MongoDB Connection Boilerplate</div>
      <div className="snippet-card">Protected Route Middleware</div>
    </div>
  );
}