"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getReviewHistory,
  deleteReview,
} from "@/services/reviewService";

import "@/styles/dashboard.css";

export default function History() {
  const [reviews, setReviews] =
    useState([]);

const fetchHistory = async () => {
  try {
    console.log("Fetching History...");
    const data =
      await getReviewHistory();

    setReviews(data);

  } catch (err) {
    console.log(
      "HISTORY ERROR:",
      err.response?.data
    );
  }
};

  useEffect(() => {
    void Promise.resolve().then(
      fetchHistory
    );
  }, []);

  const handleDelete =
    async (id) => {
      await deleteReview(id);

      fetchHistory();
    };

  return (
    <div className="history-page">
      <h1>
        Review History
      </h1>

      <div className="history-grid">
        {reviews.map(
          (review) => (
            <div
              key={review._id}
              className="history-card"
            >
              <h3>
                {
                  review.language
                }
              </h3>

              <p>
                {
                  review.code.slice(
                    0,
                    100
                  )
                }
                ...
              </p>

              <small>
                {new Date(
                  review.createdAt
                ).toLocaleString()}
              </small>

              <button
                onClick={() =>
                  handleDelete(
                    review._id
                  )
                }
              >
                Delete
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
