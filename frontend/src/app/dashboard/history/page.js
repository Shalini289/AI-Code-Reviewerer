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
  const [error, setError] =
    useState("");

const fetchHistory = async () => {
  try {
    setError("");
    const data =
      await getReviewHistory();

    setReviews(data);

  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Could not load review history."
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
      try {
        setError("");
        await deleteReview(id);
        fetchHistory();
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Could not delete this review."
        );
      }
    };

  return (
    <div className="history-page">
      <h1>
        Review History
      </h1>

      {error && <p className="error">{error}</p>}

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
