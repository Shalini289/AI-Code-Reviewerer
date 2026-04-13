"use client";

import {
  useState,
} from "react";

import {
  updateProfile,
  changePassword,
  deleteAccount,
} from "@/services/userService";

import {
  useRouter,
} from "next/navigation";

import "@/styles/dashboard.css";

export default function SettingsPage() {
  const router =
    useRouter();

  const [profile, setProfile] =
    useState({
      name: "",
      email: "",
    });

  const [password, setPassword] =
    useState({
      oldPassword: "",
      newPassword: "",
    });

  const handleProfileUpdate =
    async () => {
      await updateProfile(
        profile
      );

      alert(
        "Profile Updated"
      );
    };

 
    const handlePasswordChange =
  async () => {
    try {
      await changePassword(
        password
      );

      alert(
        "Password Changed"
      );

    } catch (err) {
      console.log(
        err.response?.data
      );

      alert(
        err.response?.data
          ?.message
      );
    }
  };

  const handleDelete =
    async () => {
      await deleteAccount();

      localStorage.clear();

      router.push(
        "/register"
      );
    };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-card">
        <h3>
          Update Profile
        </h3>

        <input
          placeholder="Name"
          onChange={(e) =>
            setProfile({
              ...profile,
              name:
                e.target
                  .value,
            })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setProfile({
              ...profile,
              email:
                e.target
                  .value,
            })
          }
        />

        <button
          onClick={
            handleProfileUpdate
          }
        >
          Save Changes
        </button>
      </div>

      <div className="settings-card">
        <h3>
          Change Password
        </h3>

        <input
          type="password"
          placeholder="Old Password"
          onChange={(e) =>
            setPassword({
              ...password,
              oldPassword:
                e.target
                  .value,
            })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) =>
            setPassword({
              ...password,
              newPassword:
                e.target
                  .value,
            })
          }
        />

        <button
          onClick={
            handlePasswordChange
          }
        >
          Change Password
        </button>
      </div>

      <div className="settings-card danger">
        <h3>
          Delete Account
        </h3>

        <button
          onClick={
            handleDelete
          }
        >
          Delete Forever
        </button>
      </div>
    </div>
  );
}