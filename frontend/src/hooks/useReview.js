"use client";

import { useState } from "react";
import { reviewCode } from "@/services/reviewService";

export default function useReview() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyzeCode = async (code, language) => {
    try {
      setLoading(true);
      setError("");

      const data = await reviewCode({
        code,
        language,
      });

      setResult(data);
    } catch (err) {
      setError("Failed to analyze code.");
    } finally {
      setLoading(false);
    }
  };

  return {
    analyzeCode,
    result,
    loading,
    error,
  };
}