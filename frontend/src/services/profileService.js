import api from "@/utils/api";

export const getProfile =
  async () => {
    const res =
      await api.get(
        "api/profile"
      );

    return res.data;
  };