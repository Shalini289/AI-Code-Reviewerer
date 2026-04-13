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
                result.betterCode
              }
            </p>
          </div>

          <div className="result-card">
            <h3>
              ⚡ Performance
            </h3>
            <p>
              {
                result.performance
              }
            </p>
          </div>

          <div className="result-card">
            <h3>
              📖 Readability
            </h3>
            <p>
              {
                result.readability
              }
            </p>
          </div>

          <div className="result-card">
            <h3>
              🚀 Suggestions
            </h3>

            <ul>
             {result?.suggestions?.map((item,i)=> (
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