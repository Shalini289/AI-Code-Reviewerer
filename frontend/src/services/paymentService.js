import api from "@/utils/api";

export const upgradePlan =
  async (plan) => {
    const res =
      await api.put(
        "api/payment/upgrade",
        { plan }
      );

    return res.data;
  };