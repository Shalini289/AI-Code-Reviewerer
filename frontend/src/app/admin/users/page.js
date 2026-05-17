"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getUsers,
  deleteUser,
} from "@/services/adminService";

export default function UsersPage() {
  const [users, setUsers] =
    useState([]);
  const [error, setError] =
    useState("");

  const fetchUsers =
    async () => {
      try {
        setError("");
        const data =
          await getUsers();

        setUsers(data);

      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Could not load users."
        );
      }
    };

  useEffect(() => {
    void Promise.resolve().then(
      fetchUsers
    );
  }, []);

  const handleDelete =
    async (id) => {
      try {
        setError("");
        await deleteUser(id);

        fetchUsers();

      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Could not delete this user."
        );
      }
    };

  return (
    <div>
      <h1>
        Manage Users
      </h1>

      {error && <p>{error}</p>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Plan</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(
            (user) => (
              <tr
                key={
                  user._id
                }
              >
                <td>
                  {
                    user.name
                  }
                </td>

                <td>
                  {
                    user.email
                  }
                </td>

                <td>
                  {
                    user.role
                  }
                </td>

                <td>
                  {
                    user.plan
                  }
                </td>

                <td>
                  <button
                    className="admin-btn delete-btn"
                    onClick={() =>
                      handleDelete(
                        user._id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
