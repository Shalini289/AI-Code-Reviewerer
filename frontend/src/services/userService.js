import api from "@/utils/api";

export const updateProfile =
  async (data) => {
    const res =
      await api.put(
        "/user/update",
        data
      );

    return res.data;
  };

export const changePassword =
  async (data) => {
    const res =
      await api.put(
        "/user/change-password",
        data
      );

    return res.data;
  };

export const deleteAccount =
  async () => {
    const res =
      await api.delete(
        "/api/user/delete"
      );

    return res.data;
  };