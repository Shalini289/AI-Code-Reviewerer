import api from "@/utils/api";

export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await api.post("/auth/login", userData);
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};