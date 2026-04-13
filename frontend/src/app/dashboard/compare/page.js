"use client";

import {
  useState,
} from "react";

import {
  compareCode,
} from "@/services/compareService";

import "@/styles/dashboard.css";

export default function ComparePage() {
  const [form, setForm] =
    useState({
      code1: "",
      code2: "",
      language:
        "javascript",
    });

  const [result, setResult] =
    useState("");

  const handleCompare =
    async () => {
      try {
        const res =
          await compareCode(
            form
          );

        setResult(
          res.result
        );

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
        placeholder="Enter First Code"
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
        placeholder="Enter Second Code"
        onChange={(e) =>
          setForm({
            ...form,
            code2:
              e.target
                .value,
          })
        }
      />

      <select
        onChange={(e) =>
          setForm({
            ...form,
            language:
              e.target
                .value,
          })
        }
      >
        <option>
          javascript
        </option>

        <option>
          python
        </option>

        <option>
          java
        </option>

         <option>
          c++
        </option>
      </select>

      <button
        onClick={
          handleCompare
        }
      >
        Compare
      </button>

      {result && (
        <div className="compare-result">
          <h2>
            Result
          </h2>

          <p>
            {result}
          </p>
        </div>
      )}
    </div>
  );
}