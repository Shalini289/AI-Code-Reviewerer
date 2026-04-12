"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
  adminOnly = false,
}) {
  const router = useRouter();

  const {
    user,
    loading,
    isAuthenticated,
  } = useAuthContext();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      }

      if (
        adminOnly &&
        user?.role !== "admin"
      ) {
        router.push("/dashboard");
      }
    }
  }, [
    user,
    loading,
    isAuthenticated,
    adminOnly,
    router,
  ]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (adminOnly && user?.role !== "admin") {
    return null;
  }

  return children;
}