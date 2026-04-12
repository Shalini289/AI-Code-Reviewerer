import api from "@/utils/api";

export const subscribePlan = async (plan) => {
  const res = await api.post("/payment/subscribe", {
    plan,
  });

  return res.data;
};

export const getBillingHistory = async () => {
  const res = await api.get("/payment/history");
  return res.data;
};