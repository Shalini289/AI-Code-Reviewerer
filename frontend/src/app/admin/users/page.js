import "@/styles/admin.css";

export default function Users() {
  return (
    <div className="admin-page">
      <h1>User Management</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Shalini</td>
            <td>shalini@example.com</td>
            <td>Pro</td>
            <td>Active</td>
            <td><button>Ban</button></td>
          </tr>
          <tr>
            <td>Rahul</td>
            <td>rahul@example.com</td>
            <td>Free</td>
            <td>Active</td>
            <td><button>Ban</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}