import api from "@/utils/api";

export const getProfile =
  async () => {
    const res =
      await api.get(
        "/profile"
      );

    return res.data;
  };