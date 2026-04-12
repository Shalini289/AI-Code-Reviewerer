import Link from "next/link";
import "@/styles/auth.css";

export default function Register() {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h1>Create Account</h1>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Register</button>

        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}