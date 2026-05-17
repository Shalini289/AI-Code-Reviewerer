"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAdminStats,
} from "@/services/adminService";

export default function AnalyticsPage() {
  const [stats, setStats] =
    useState(null);
  const [error, setError] =
    useState("");

  const fetchStats =
    async () => {
      try {
        setError("");
        const data =
          await getAdminStats();

        setStats(data);

      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Could not load analytics."
        );
      }
    };

  useEffect(() => {
    void Promise.resolve().then(
      fetchStats
    );
  }, []);

  if (!stats)
    return (
      <p>
        {error || "Loading..."}
      </p>
    );

  return (
    <div>
      <h1>
        Analytics
      </h1>

      <div className="analytics-grid">

        <div className="analytics-card">
          <h3>
            User Growth
          </h3>

          <p>
            {
              stats.totalUsers
            }{" "}
            Users
          </p>
        </div>

        <div className="analytics-card">
          <h3>
            Review Growth
          </h3>

          <p>
            {
              stats.totalReviews
            }{" "}
            Reviews
          </p>
        </div>

        <div className="analytics-card">
          <h3>
            Avg Reviews/User
          </h3>

          <p>
            {stats.totalUsers
              ? (
                stats.totalReviews /
                stats.totalUsers
              ).toFixed(
                1
              )
              : "0.0"}
          </p>
        </div>

      </div>
    </div>
  );
}
