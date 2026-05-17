"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardData,
} from "@/services/dashboardService";

import "@/styles/dashboard.css";

export default function DashboardPage() {
  const [data, setData] =
    useState(null);
  const [error, setError] =
    useState("");

  const fetchDashboard =
    async () => {
      try {
        setError("");
        const res =
          await getDashboardData();

        setData(res);

      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Could not load dashboard data."
        );
      }
    };

  useEffect(() => {
    void Promise.resolve().then(
      fetchDashboard
    );
  }, []);

  if (!data)
    return (
      <div className="dashboard-page">
        {error ? <p className="error">{error}</p> : <p>Loading...</p>}
      </div>
    );

  return (
    <div className="dashboard-page">
      <h1>
        Welcome Back,{" "}
        {
          data.user
            .name
        }
      </h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>
            Total Reviews
          </h3>
          <p>
            {
              data.totalReviews
            }
          </p>
        </div>

        <div className="stat-card">
          <h3>
            This Month
          </h3>
          <p>
            {
              data.monthlyReviews
            }
          </p>
        </div>

      </div>

      <div className="recent-section">
        <h2>
          Recent Reviews
        </h2>

        {data.recentReviews.map(
          (review) => (
            <div
              key={
                review._id
              }
              className="review-item"
            >
              <h4>
                {
                  review.language
                }
              </h4>

              <p>
                {review.code.slice(
                  0,
                  80
                )}
                ...
              </p>
            </div>
          )
        )}
      </div>

    </div>
  );
}
