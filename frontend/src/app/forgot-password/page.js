"use client";
import "@/styles/auth.css";
import {
  useState,
} from "react";

import api from "@/utils/api";


export default function ForgotPassword() {
  const [email, setEmail] =
    useState("");

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      try {
        await api.post(
          "/api/auth/forgot-password",
          { email }
        );

        alert(
          "Reset email sent!"
        );

      } catch (err) {
        console.log(err);
        alert(
          err.response?.data?.message ||
          "Could not send reset email"
        );
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

        <button type="submit">
          Send Reset Link
        </button>
    </form>
    </div>
  );
}
