"use client";
import "@/styles/auth.css";
import {
  useState,
} from "react";

import api from "@/utils/api";


export default function ForgotPassword() {
  const [email, setEmail] =
    useState("");
  const [status, setStatus] =
    useState({
      type: "",
      message: "",
    });
  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (event) => {
      event.preventDefault();
      setStatus({
        type: "",
        message: "",
      });

      const normalizedEmail =
        email.trim().toLowerCase();

      if (!normalizedEmail) {
        setStatus({
          type: "error",
          message: "Please enter your account email.",
        });
        return;
      }

      try {
        setLoading(true);

        const res =
          await api.post(
          "/api/auth/forgot-password",
          {
            email:
              normalizedEmail,
          }
        );

        setStatus({
          type: "success",
          message:
            res.data?.message ||
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
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <h1>
          Forgot Password
        </h1>

        <p className="auth-help">
          Enter the email used for your account. We will send a reset link that expires in 10 minutes.
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
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        <p className="auth-help">
          If it does not arrive, check spam or use the same email you registered with.
        </p>
    </form>
    </div>
  );
}
