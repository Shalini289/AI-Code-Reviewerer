"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import ProtectedRoute from "@/components/ProtectedRoute";

import "@/styles/dashboard.css";

const navSections = [
  {
    title: "Review",
    links: [
      { href: "/dashboard", label: "Overview" },
      { href: "/dashboard/review", label: "AI Reviewer" },
      { href: "/dashboard/github-review", label: "GitHub Review" },
      { href: "/dashboard/compare", label: "Compare" },
      { href: "/dashboard/security", label: "Security" },
    ],
  },
  {
    title: "Labs",
    links: [
      { href: "/dashboard/intelligence", label: "Intelligence" },
      { href: "/dashboard/security-lab", label: "Security Lab" },
      { href: "/dashboard/refactor-lab", label: "Refactor Lab" },
      { href: "/dashboard/performance-lab", label: "Performance" },
      { href: "/dashboard/devops", label: "DevOps" },
      { href: "/dashboard/automation", label: "Automation" },
      { href: "/dashboard/learning", label: "Learning" },
      { href: "/dashboard/collaboration", label: "Collaboration" },
    ],
  },
  {
    title: "Workspace",
    links: [
      { href: "/dashboard/history", label: "History" },
      { href: "/dashboard/snippets", label: "Snippets" },
      { href: "/dashboard/billing", label: "Billing" },
      { href: "/dashboard/profile", label: "Profile" },
      { href: "/dashboard/settings", label: "Settings" },
    ],
  },
];

export default function DashboardLayout({
  children,
}) {
  const router = useRouter();
  const pathname = usePathname();

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
        <aside className="sidebar">
          <div className="sidebar-brand">
            <span>AI</span>
            <div>
              <h2>AI Reviewer</h2>
              <p>Code quality studio</p>
            </div>
          </div>

          <nav aria-label="Dashboard navigation">
            {navSections.map((section) => (
              <div className="nav-section" key={section.title}>
                <p>{section.title}</p>

                {section.links.map((link) => {
                  const isActive =
                    link.href === "/dashboard"
                      ? pathname === link.href
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      className={isActive ? "active" : ""}
                      href={link.href}
                      key={link.href}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            ))}
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

        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
