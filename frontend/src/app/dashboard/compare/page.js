"use client";

import { useState } from "react";
import { compareCode } from "@/services/compareService";

export default function ComparePage() {
  const [form, setForm] =
    useState({
      code1: "",
      code2: "",
      language:
        "javascript",
    });

  const [result, setResult] =
    useState(null);

  const handleCompare =
    async () => {
      try {
        const res =
          await compareCode(
            form
          );

        setResult(res);

      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="compare-page">
      <h1>
        Compare Code
      </h1>

      <textarea
        placeholder="First Code"
        onChange={(e) =>
          setForm({
            ...form,
            code1:
              e.target
                .value,
          })
        }
      />

      <textarea
        placeholder="Second Code"
        onChange={(e) =>
          setForm({
            ...form,
            code2:
              e.target
                .value,
          })
        }
      />

      <button
        onClick={
          handleCompare
        }
      >
        Compare
      </button>

      {result && (
        <div className="compare-result">

          <div className="result-card winner">
            <h3>
              🏆 Better Code
            </h3>
            <p>
              {
                result.winner
              }
            </p>
          </div>

 <div className="result-card ">
            <h3>
              Reason
            </h3>
            <p>
              {
                result.reason
              }
            </p>
          </div>

          <div className="result-card">
            <h3>
              ⚡ Comparison
            </h3>
            <p>
              {
                result.comparison
              }
            </p>
          </div>
 <div className="result-card">
            <h3>
               Pros
            </h3>
            <p>
              {
                result.pros
              }
            </p>
          </div>
          <div className="result-card">
            <h3>
              Cons
            </h3>
            <p>
              {
                result.cons
              }
            </p>
          </div>
 <div className="result-card">
            <h3>
              Improvements
            </h3>
            <p>
              {
                result.improvements
              }
            </p>
          </div>
         

        </div>
      )}
    </div>
  );
}