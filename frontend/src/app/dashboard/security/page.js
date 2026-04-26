"use client";

import {
  useState,
} from "react";

import {
  scanSecurity,
} from "@/services/securityService";

import "@/styles/dashboard.css";

export default function SecurityPage() {
  const [form, setForm] =
    useState({
      code: "",
      language:
        "javascript",
    });

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleScan =
    async () => {
      try {
        setLoading(true);

        const res =
          await scanSecurity(
            form
          );

        setResult(res);

      } catch (err) {
        console.log(err);

      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="security-page">
      <h1>
        Security Analyzer
      </h1>

      <textarea
        placeholder="Paste your code..."
        onChange={(e) =>
          setForm({
            ...form,
            code:
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
      </select>

      <button
        onClick={
          handleScan
        }
      >
        {loading
          ? "Scanning..."
          : "Scan Security"}
      </button>

      {result && (
        <div className="security-result">

          <div className="result-card danger">
            <h3>
              Risk Level
            </h3>

            <p>
              {
                result.riskLevel
              }
            </p>
          </div>
 <div className="result-card">
            <h3>
              Summary
            </h3>

            <p>
              {
                result.summary
              }
            </p>
          </div>
          <div className="result-card">
            <h3>
              Vulnerabilities
            </h3>

            <ul>
              {(result
                ?.vulnerabilities ||
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

          <div className="result-card">
            <h3>
              Best Practices
            </h3>

            <ul>
              {(result
                ?.bestPractices ||
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
 <div className="result-card ">
            <h3>
           Secure Code
            </h3>

            <p>
              {
                result.secureCodeExample
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}