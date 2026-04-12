import Link from "next/link";
import "@/styles/auth.css";

export default function ForgotPassword() {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h1>Forgot Password</h1>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Send Reset Link</button>

        <p>
          Back to <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}