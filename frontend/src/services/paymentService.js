import api from "@/utils/api";

export const upgradePlan =
  async (plan) => {
    const res =
      await api.put(
        "/payment/upgrade",
        { plan }
      );

    return res.data;
  };