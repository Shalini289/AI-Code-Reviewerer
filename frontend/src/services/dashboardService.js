import api from "@/utils/api";

export const getDashboardData =
  async () => {
    const res =
      await api.get(
        "/dashboard"
      );

    return res.data;
  };