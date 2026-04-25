import api from "@/utils/api";

export const submitContact =
  async (data) => {
    const res =
      await api.post(
        "/api/contact",
        data
      );

    return res.data;
  };