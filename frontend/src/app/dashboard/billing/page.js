"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getBillingInfo,
} from "@/services/billingService";

import "@/styles/dashboard.css";

export default function BillingPage() {
  const [billing, setBilling] =
    useState(null);
  const [error, setError] =
    useState("");

  const fetchBilling =
    async () => {
      try {
        setError("");
        const data =
          await getBillingInfo();

        setBilling(data);

      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Could not load billing information."
        );
      }
    };

  useEffect(() => {
    void Promise.resolve().then(
      fetchBilling
    );
  }, []);

  if (!billing)
    return (
      <div className="billing-page">
        {error ? <p className="error">{error}</p> : <p>Loading...</p>}
      </div>
    );

  return (
    <div className="billing-page">
      <h1>Billing</h1>

      <div className="billing-card">
        <h3>
          Current Plan
        </h3>

        <p>
          {
            billing.currentPlan
          }
        </p>
      </div>

      <div className="billing-card">
        <h3>
          Joined Date
        </h3>

        <p>
          {new Date(
            billing.joinedDate
          ).toLocaleDateString()}
        </p>
      </div>

      <div className="billing-history">
        <h2>
          Billing History
        </h2>

        {billing.billingHistory.map(
          (item) => (
            <div
              key={
                item.id
              }
              className="history-item"
            >
              <p>
                {
                  item.amount
                }
              </p>

              <p>
                {
                  item.status
                }
              </p>

              <p>
                {
                  item.date
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
