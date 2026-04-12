import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import "@/styles/admin.css";

export default function AdminLayout({
  children,
}) {
  return (
    <ProtectedRoute adminOnly={true}>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2>Admin Panel</h2>

          <nav>
            <Link href="/admin">
              Dashboard
            </Link>

            <Link href="/admin/users">
              Users
            </Link>

            <Link href="/admin/reviews">
              Reviews
            </Link>

            <Link href="/admin/analytics">
              Analytics
            </Link>
          </nav>
        </aside>

        <main className="admin-main">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}