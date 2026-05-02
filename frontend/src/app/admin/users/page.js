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

  const fetchUsers =
    async () => {
      try {
        const data =
          await getUsers();

        setUsers(data);

      } catch (err) {
        console.log(err);
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
        await deleteUser(id);

        fetchUsers();

      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div>
      <h1>
        Manage Users
      </h1>

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
