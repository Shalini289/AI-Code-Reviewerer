import Link from "next/link";

import "@/styles/admin.css";

export default function AdminLayout({
  children,
}) {
  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">
        <h2>
          Admin Panel
        </h2>

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
      </aside>

      <main className="admin-main">
        {children}
      </main>

    </div>
  );
}