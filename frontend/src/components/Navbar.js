"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="nav-logo">
        <Link href="/">
          AI Reviewer
        </Link>
      </div>

      <div className="nav-links">
        <Link href="/">
          Home
        </Link>

        <Link href="/about">
          About
        </Link>
<Link href="/docs">
  Docs
</Link>
        <Link href="/pricing">
          Pricing
        </Link>

        <Link href="/contact">
          Contact
        </Link>
      </div>

      <div className="nav-actions">
        <Link
          href="/login"
          className="nav-login"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="nav-register"
        >
          Get Started
        </Link>
      </div>

    </nav>
  );
}