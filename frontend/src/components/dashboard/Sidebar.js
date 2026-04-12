import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/review">Review</Link>
      <Link href="/dashboard/history">History</Link>
      <Link href="/dashboard/settings">Settings</Link>
    </aside>
  );
}