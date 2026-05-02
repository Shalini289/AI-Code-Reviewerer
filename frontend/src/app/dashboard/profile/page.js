"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getProfile,
} from "@/services/profileService";

import "@/styles/dashboard.css";

export default function ProfilePage() {
  const [profile, setProfile] =
    useState(null);

  const fetchProfile =
    async () => {
      try {
        const data =
          await getProfile();

        setProfile(data);

      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    void Promise.resolve().then(
      fetchProfile
    );
  }, []);

  if (!profile)
    return (
      <p>
        Loading...
      </p>
    );

  return (
    <div className="profile-page">
      <h1>
        My Profile
      </h1>

      <div className="profile-card">

        <div className="profile-avatar">
          {profile.name
            ?.charAt(0)
            .toUpperCase()}
        </div>

        <h2>
          {
            profile.name
          }
        </h2>

        <p>
          {
            profile.email
          }
        </p>

        <div className="profile-info">
          <div>
            <strong>
              Role:
            </strong>{" "}
            {
              profile.role
            }
          </div>

          <div>
            <strong>
              Plan:
            </strong>{" "}
            {
              profile.plan
            }
          </div>

          <div>
            <strong>
              Total Reviews:
            </strong>{" "}
            {
              profile.totalReviews
            }
          </div>

          <div>
            <strong>
              Joined:
            </strong>{" "}
            {new Date(
              profile.createdAt
            ).toLocaleDateString()}
          </div>
        </div>

      </div>
    </div>
  );
}
