"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/services/authService";
import "@/styles/auth.css";


export default function Login() {
  const router = useRouter();
 const [show, setShow] = useState(false);
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

     useEffect(() => {
  localStorage.getItem("token");
  localStorage.setItem(
        "user",
        JSON.stringify(res.user)
      );
}, []);
      

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

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
<div style={{ position: "relative" }}>
  <input
    type={show ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={form.password}
    onSubmit={handleSubmit}
    style={{ width: "100%", paddingRight: "40px" }}
  />


</div>
        <Link href="/forgot-password">
  Forgot Password?
</Link>

        <button type="submit">
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p>
          No account?
          <Link href="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}