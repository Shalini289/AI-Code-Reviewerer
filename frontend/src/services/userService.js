import api from "@/utils/api";

export const getProfile = async () => {
  const res = await api.get("/api/user/profile");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/api/user/profile", data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await api.put(
    "/api/user/change-password",
    data
  );
  return res.data;
};