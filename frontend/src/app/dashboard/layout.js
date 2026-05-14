"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import ProtectedRoute from "@/components/ProtectedRoute";

import "@/styles/dashboard.css";

export default function DashboardLayout({
  children,
}) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="dashboard-layout">

        {/* Sidebar */}
        <aside className="sidebar">
          <h2>
            AI Reviewer
          </h2>

          <nav>
            <Link href="/dashboard">
              Dashboard
            </Link>



            <Link href="/dashboard/review">
              Review
            </Link>
            <Link href="/dashboard/github-review">
  GitHub Review
</Link>
<Link href="/dashboard/intelligence">
  Intelligence
</Link>
<Link href="/dashboard/security-lab">
  Security Lab
</Link>
<Link href="/dashboard/refactor-lab">
  Refactor Lab
</Link>
<Link href="/dashboard/performance-lab">
  Performance
</Link>
<Link href="/dashboard/devops">
  DevOps
</Link>
<Link href="/dashboard/automation">
  Automation
</Link>
<Link href="/dashboard/learning">
  Learning
</Link>
<Link href="/dashboard/collaboration">
  Collaboration
</Link>
<Link href="/dashboard/compare">
  Compare
</Link>
            <Link href="/dashboard/history">
              History
            </Link>
            <Link href="/dashboard/security">
  Security
</Link>
<Link href="/dashboard/snippets">
  Snippets
</Link>
<Link href="/dashboard/billing">
  Billing
</Link>
<Link href="/dashboard/profile">
  Profile
</Link>
            <Link href="/dashboard/settings">
              Settings
            </Link>
          </nav>

          <button
            onClick={
              handleLogout
            }
            className="logout-btn"
          >
            Logout
          </button>
        </aside>

        {/* Content */}
        <main className="dashboard-main">
          {children}
        </main>

      </div>
    </ProtectedRoute>
  );
}
