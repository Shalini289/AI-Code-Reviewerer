import "@/styles/dashboard.css";

export default function Profile() {
  return (
    <div className="tool-page">
      <h1>User Profile</h1>

      <div className="profile-card">
        <img src="https://via.placeholder.com/100" alt="avatar" />
        <h2>Shalini Bhadouriya</h2>
        <p>Full Stack Developer</p>
      </div>

      <div className="profile-info">
        <p>Email: shalini@example.com</p>
        <p>Joined: Jan 2026</p>
        <p>Reviews Completed: 152</p>
      </div>
    </div>
  );
}