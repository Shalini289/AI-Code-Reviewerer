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

  useEffect(() => {
    fetchBilling();
  }, []);

  const fetchBilling =
    async () => {
      try {
        const data =
          await getBillingInfo();

        setBilling(data);

      } catch (err) {
        console.log(err);
      }
    };

  if (!billing)
    return (
      <p>
        Loading...
      </p>
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