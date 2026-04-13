import api from "@/utils/api";

export const getBillingInfo =
  async () => {
    const res =
      await api.get(
        "/billing"
      );

    return res.data;
  };