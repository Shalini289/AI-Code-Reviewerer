import Link from "next/link";
import "@/styles/auth.css";

export default function Login() {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h1>Login</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>

        <p>
          Forgot Password? <Link href="/forgot-password">Reset</Link>
        </p>

        <p>
          Don't have an account? <Link href="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}