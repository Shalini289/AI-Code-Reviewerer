import "@/styles/admin.css";

export default function Reviews() {
  return (
    <div className="admin-page">
      <h1>Review Management</h1>

      <div className="review-card">
        <h3>JavaScript Auth Review</h3>
        <p>Submitted by Shalini</p>
        <button>Delete</button>
      </div>

      <div className="review-card">
        <h3>Python Sorting Review</h3>
        <p>Submitted by Rahul</p>
        <button>Delete</button>
      </div>
    </div>
  );
}