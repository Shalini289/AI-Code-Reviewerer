import api from "@/utils/api";

export const getDashboardData =
  async () => {
    const res =
      await api.get(
        "/api/dashboard"
      );

    return res.data;
  };