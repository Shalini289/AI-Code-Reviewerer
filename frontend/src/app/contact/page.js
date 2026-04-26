"use client";

import "@/styles/landing.css";
import { useState } from "react";
import { submitContact } from "@/services/contactService";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     setLoading(true);

      await submitContact(form);

      alert(
        "Message Sent!"
      );

      setForm({
        name: "",
        email: "",
        message: "",
      });

    } catch (err) {
      console.log(
        err.response?.data
      );

      alert(
        "Failed to send message"
      );
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-header">
        <h1>Contact Us</h1>

        <p>
          Have questions,
          feedback, or need
          support? We'd love
          to hear from you.
        </p>
      </section>

      <div className="contact-container">

        <div className="contact-form-card">
          <h2>
            Send Message
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={
                handleChange
              }
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={
                handleChange
              }
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Your Message"
              value={
                form.message
              }
              onChange={
                handleChange
              }
            ></textarea>

            <button type="submit">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-info-card">
          <h2>
            Get In Touch
          </h2>

          <p>
            📧 support@aicodereviewer.com
          </p>

          <p>
            📞 +91 3456543210
          </p>

          <p>
            📍 Bhopal,
            Madhya Pradesh,
            India
          </p>
        </div>
      </div>
    </div>
  );
}