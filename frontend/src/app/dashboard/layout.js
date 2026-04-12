import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import "@/styles/dashboard.css";

export default function DashboardLayout({
  children,
}) {
  return (
    <ProtectedRoute>
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h2>Dashboard</h2>

          <nav>
            <Link href="/dashboard">
              Home
            </Link>

            <Link href="/dashboard/review">
              Review
            </Link>

            <Link href="/dashboard/history">
              History
            </Link>

            <Link href="/dashboard/settings">
              Settings
            </Link>
          </nav>
        </aside>

        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}