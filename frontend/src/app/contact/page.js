"use client";

import { useState } from "react";
import { submitContact } from "@/services/contactService";
import "@/styles/landing.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        type: "error",
        message: "Please fill in every field before sending.",
      });
      return;
    }

    try {
      setLoading(true);
      await submitContact(form);

      setStatus({
        type: "success",
        message: "Message sent successfully.",
      });

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>
          Have questions, feedback, or need support? We&apos;d love to hear from
          you.
        </p>
      </section>

      <div className="contact-container">
        <div className="contact-form-card">
          <h2>Send Message</h2>

          <form onSubmit={handleSubmit}>
            {status.message ? (
              <p
                className={
                  status.type === "success"
                    ? "form-message success"
                    : "form-message error-message"
                }
              >
                {status.message}
              </p>
            ) : null}

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="contact-info-card">
          <h2>Get In Touch</h2>
          <p>Email: support@aicodereviewer.com</p>
          <p>Phone: +91 3456543210</p>
          <p>Location: Bhopal, Madhya Pradesh, India</p>
        </div>
      </div>
    </div>
  );
}
