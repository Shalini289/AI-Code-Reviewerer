"use client";

import {
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import api from "@/utils/api";

export default function ResetPassword() {
  const { token } =
    useParams();

  const [password,
    setPassword] =
    useState("");

  const handleReset =
    async () => {
      try {
        await api.put(
          `/auth/reset-password/${token}`,
          {
            password,
          }
        );

        alert(
          "Password Reset Successful"
        );

      } catch (err) {
        console.log(err);
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

        <button type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
}