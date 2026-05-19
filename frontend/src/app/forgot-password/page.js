"use client";

import Link from "next/link";
import { useState } from "react";
import { requestPasswordReset } from "@/services/authService";
import "@/styles/auth.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({
      type: "",
      message: "",
    });

    const cleanEmail =
      email.trim().toLowerCase();

    if (!cleanEmail) {
      setStatus({
        type: "error",
        message: "Enter the email address for your account.",
      });
      return;
    }

    try {
      setLoading(true);

      const res =
        await requestPasswordReset(cleanEmail);

      setStatus({
        type: "success",
        message:
          res.message ||
          "Reset email sent. Please check your inbox and spam folder.",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "Could not send reset email. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <p className="auth-help">
          Enter your account email and we will send you a reset link.
        </p>

        {status.message ? (
          <div
            className={
              status.type === "success"
                ? "success-box"
                : "error-box"
            }
          >
            {status.message}
          </div>
        ) : null}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="auth-footer">
          Remembered it?
          <Link href="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
