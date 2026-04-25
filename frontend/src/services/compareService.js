import api from "@/utils/api";

export const compareCode =
  async (data) => {
    const res =
      await api.post(
        "api/compare",
        data
      );

    return res.data;
  };