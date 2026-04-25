import api from "@/utils/api";

export const getBillingInfo =
  async () => {
    const res =
      await api.get(
        "/api/billing"
      );

    return res.data;
  };