"use client";

import { useState } from "react";
import { upgradePlan } from "@/services/paymentService";
import "@/styles/landing.css";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "INR 0/month",
    cta: "Select Plan",
    features: ["10 Reviews/day", "Basic AI Review", "Community Support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "INR 499/month",
    cta: "Upgrade Now",
    featured: true,
    features: ["Unlimited Reviews", "Advanced AI Review", "Priority Support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "INR 1499/month",
    cta: "Upgrade Now",
    features: ["Team Access", "Admin Dashboard", "Dedicated Support"],
  },
];

export default function PricingPage() {
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [loadingPlan, setLoadingPlan] = useState("");

  const handleUpgrade = async (plan) => {
    try {
      setLoadingPlan(plan);
      setStatus({ type: "", message: "" });

      await upgradePlan(plan);

      setStatus({
        type: "success",
        message: `${plan} plan activated.`,
      });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "Could not update the plan. Please log in and try again.",
      });
    } finally {
      setLoadingPlan("");
    }
  };

  return (
    <div className="pricing-page">
      <section className="pricing-header">
        <h1>Pricing Plans</h1>
        <p>Choose the plan that fits your code review workflow.</p>
      </section>

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

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div
            className={`pricing-card ${plan.featured ? "featured" : ""}`}
            key={plan.id}
          >
            <h2>{plan.name}</h2>
            <h3>{plan.price}</h3>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade(plan.id)}
              disabled={loadingPlan === plan.id}
            >
              {loadingPlan === plan.id ? "Updating..." : plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
