"use client";

import {
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import api from "@/utils/api";
import "@/styles/auth.css";

export default function ResetPassword() {
  const { token } =
    useParams();

  const [password,
    setPassword] =
    useState("");
  const [status, setStatus] =
    useState({
      type: "",
      message: "",
    });
  const [loading, setLoading] =
    useState(false);

  const handleReset =
    async (event) => {
      event.preventDefault();
      setStatus({
        type: "",
        message: "",
      });

      if (password.length < 6) {
        setStatus({
          type: "error",
          message: "Password must be at least 6 characters.",
        });
        return;
      }

      try {
        setLoading(true);

        const res =
          await api.put(
          `/api/auth/reset-password/${token}`,
          {
            password,
          }
        );

        setStatus({
          type: "success",
          message:
            res.data?.message ||
            "Password reset successful. You can now log in.",
        });

      } catch (err) {
        setStatus({
          type: "error",
          message:
            err.response?.data?.message ||
            "Password reset failed. The link may be expired.",
        });
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="auth-container">
      <form
        className="auth-form"
        onSubmit={handleReset}
      >
        <h1>
          Reset Password
        </h1>

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
          type="password"
          placeholder="New Password"
          value={
            password
          }
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Resetting..."
            : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
