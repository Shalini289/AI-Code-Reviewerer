"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>CodeReviewer</h2>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div className="nav-buttons">
        <Link href="/login">Login</Link>
        <Link href="/register" className="primary-btn">
          Get Started
        </Link>
      </div>
    </nav>
  );
}