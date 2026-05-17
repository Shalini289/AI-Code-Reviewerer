"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAdminStats,
} from "@/services/adminService";

export default function AdminPage() {
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
          "Could not load admin stats."
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
        Admin Dashboard
      </h1>

      <div className="admin-stats">

        <div className="admin-card">
          <h3>
            Total Users
          </h3>

          <p>
            {
              stats.totalUsers
            }
          </p>
        </div>

        <div className="admin-card">
          <h3>
            Total Reviews
          </h3>

          <p>
            {
              stats.totalReviews
            }
          </p>
        </div>

      </div>

      <div className="recent-users">
        <h2>
          Recent Users
        </h2>

        {stats.recentUsers.map(
          (user) => (
            <div
              key={
                user._id
              }
              className="recent-user-card"
            >
              <p>
                {
                  user.name
                }
              </p>

              <span>
                {
                  user.email
                }
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
