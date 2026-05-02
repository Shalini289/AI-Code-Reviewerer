"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getReviews,
  deleteReview,
} from "@/services/adminService";

export default function ReviewsPage() {
  const [reviews, setReviews] =
    useState([]);

  const fetchReviews =
    async () => {
      try {
        const data =
          await getReviews();

        setReviews(data);

      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    void Promise.resolve().then(
      fetchReviews
    );
  }, []);

  const handleDelete =
    async (id) => {
      try {
        await deleteReview(id);

        fetchReviews();

      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div>
      <h1>
        Manage Reviews
      </h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Code</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map(
            (review) => (
              <tr
                key={
                  review._id
                }
              >
                <td>
                  {
                    review
                      .user
                      ?.name
                  }
                </td>


                <td>
                  {review.code.slice(
                    0,
                    40
                  )}
                  ...
                </td>

                <td>
                  {new Date(
                    review.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>
                  <button
                    className="admin-btn delete-btn"
                    onClick={() =>
                      handleDelete(
                        review._id
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
