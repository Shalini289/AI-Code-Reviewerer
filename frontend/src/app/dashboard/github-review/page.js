"use client";

import {
  useState,
} from "react";

import {
  reviewGithubRepo,
} from "@/services/githubService";

export default function GithubReviewPage() {
  const [repoUrl, setRepoUrl] =
    useState("");

  const [review, setReview] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleReview =
    async () => {
      try {
        setLoading(true);

        const res =
          await reviewGithubRepo(
            repoUrl
          );

        setReview(res);

      } catch (err) {
        console.log(err);

      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="github-page">
      <h1>
        GitHub Repo Review
      </h1>

      <input
        type="text"
        placeholder="Enter Repo URL"
        value={repoUrl}
        onChange={(e) =>
          setRepoUrl(
            e.target.value
          )
        }
      />

      <button
        onClick={
          handleReview
        }
      >
        {loading
          ? "Reviewing..."
          : "Analyze Repo"}
      </button>

      {review && (
        <div className="github-result">

          <div className="result-card">
            <h3>
              📌 Project Summary
            </h3>
            <p>
              {
                review.summary
              }
            </p>
          </div>

          <div className="result-card">
            <h3>
              ⚡ Code Quality
            </h3>
            <p>
              {
                review.codeQuality
              }
            </p>
          </div>

          <div className="result-card">
            <h3>
              🏗 Architecture
            </h3>
            <p>
              {
                review.architecture
              }
            </p>
          </div>

          <div className="result-card">
            <h3>
              🔒 Security
            </h3>
            <p>
              {
                review.security
              }
            </p>
          </div>

          <div className="result-card">
            <h3>
              🚀 Suggestions
            </h3>

            <ul>
              {(review
                ?.suggestions ||
                []).map(
                (
                  item,
                  i
                ) => (
                  <li
                    key={i}
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}