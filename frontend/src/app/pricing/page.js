"use client";

import {
  upgradePlan,
} from "@/services/paymentService";

import "@/styles/landing.css";

export default function PricingPage() {
  const handleUpgrade =
    async (plan) => {
      try {
        await upgradePlan(
          plan
        );

        alert(
          `${plan} Plan Activated`
        );

      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="pricing-page">

      <section className="pricing-header">
        <h1>
          Pricing Plans
        </h1>

        <p>
          Choose the perfect
          plan for your coding
          journey.
        </p>
      </section>

      <div className="pricing-grid">

        <div className="pricing-card">
          <h2>Free</h2>

          <h3>
            ₹0/month
          </h3>

          <ul>
            <li>
              10 Reviews/day
            </li>
            <li>
              Basic AI Review
            </li>
            <li>
              Community Support
            </li>
          </ul>

          <button
            onClick={() =>
              handleUpgrade(
                "free"
              )
            }
          >
            Select Plan
          </button>
        </div>

        <div className="pricing-card featured">
          <h2>Pro</h2>

          <h3>
            ₹499/month
          </h3>

          <ul>
            <li>
              Unlimited Reviews
            </li>
            <li>
              Advanced AI Review
            </li>
            <li>
              Priority Support
            </li>
          </ul>

          <button
            onClick={() =>
              handleUpgrade(
                "pro"
              )
            }
          >
            Upgrade Now
          </button>
        </div>

        <div className="pricing-card">
          <h2>
            Enterprise
          </h2>

          <h3>
            ₹1499/month
          </h3>

          <ul>
            <li>
              Team Access
            </li>
            <li>
              Admin Dashboard
            </li>
            <li>
              Dedicated Support
            </li>
          </ul>

          <button
            onClick={() =>
              handleUpgrade(
                "enterprise"
              )
            }
          >
            Upgrade Now
          </button>
        </div>

      </div>

    </div>
  );
}