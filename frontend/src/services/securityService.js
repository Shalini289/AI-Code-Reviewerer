import api from "@/utils/api";

export const scanSecurity =
  async (data) => {
    const res =
      await api.post(
        "/security/scan",
        data
      );

    return res.data;
  };