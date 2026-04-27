"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "@/services/authService";

import "@/styles/auth.css";

export default function Register() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const regex = /^[A-Za-z ]+$/;

 
    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {
      return setError(
        "Please fill all fields"
      );
    }
 if (!regex.test(form.name)) {
    return setError(
        "Enter valid full name"
      );
  }
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(form.email)) {
  return setError(
        "Enter valid email"
      );
}
const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
if (!passwordRegex.test(form.password)) {

  return setError(
        "Password must contain uppercase, lowercase, number, special character and be 8+ characters"
      );
}
    if (
      form.password !==
      form.confirmPassword
    ) {
      return setError(
        "Passwords do not match"
      );
    }

    try {
      setLoading(true);

      const res =
        await registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
        });

      localStorage.setItem(
        "token",
        res.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.user
        )
      );

      router.push(
        "/dashboard"
      );

    } catch (err) {
      setError(
        err.response?.data
          ?.message ||
          "Registration failed"
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
        <h1>Create Account</h1>

        <p>
          Start your AI coding
          journey today.
        </p>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />
<div style={{ position: "relative" }}>
  <input
    type={show ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={form.password}
    onChange={handleChange}
    style={{ width: "100%", paddingRight: "40px" }}
  />

  <span
    onClick={() => setShow(!show)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      fontSize: "18px"
    }}
  >
    {show ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>
<div style={{ position: "relative" }}>
  <input
    type={show ? "text" : "password"}
    name="confirm-password"
    placeholder="Password"
    value={form.password}
    onChange={handleChange}
    style={{ width: "100%", paddingRight: "40px" }}
  />

  <span
    onClick={() => setShow(!show)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      fontSize: "18px"
    }}
  >
    {show ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

        <button type="submit">
          {loading
            ? "Creating..."
            : "Register"}
        </button>

        <div className="auth-footer">
          Already have account?
          <Link href="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}