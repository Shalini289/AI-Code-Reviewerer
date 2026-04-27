"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/services/authService";
import "@/styles/auth.css";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await loginUser(form);

      // ✅ STORE TOKEN
      localStorage.setItem("token", res.token);

      // ✅ STORE USER
      localStorage.setItem(
        "user",
        JSON.stringify(res.user)
      );

      // ✅ REDIRECT
      router.push("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {/* FORGOT */}
        <Link href="/forgot-password">
          Forgot Password?
        </Link>

        {/* BUTTON */}
        <button type="submit">
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* REGISTER */}
        <p>
          No account?{" "}
          <Link href="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}