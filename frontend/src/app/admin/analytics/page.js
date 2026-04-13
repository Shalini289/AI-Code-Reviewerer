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

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats =
    async () => {
      try {
        const data =
          await getAdminStats();

        setStats(data);

      } catch (err) {
        console.log(err);
      }
    };

  if (!stats)
    return (
      <p>
        Loading...
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
            {(
              stats.totalReviews /
              stats.totalUsers
            ).toFixed(
              1
            )}
          </p>
        </div>

      </div>
    </div>
  );
}