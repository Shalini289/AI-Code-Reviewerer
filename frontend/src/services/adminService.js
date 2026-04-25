import api from "@/utils/api";

export const getAdminStats =
  async () => {
    const res =
      await api.get(
        "/admin/stats"
      );

    return res.data;
  };

export const getUsers =
  async () => {
    const res =
      await api.get(
        "/admin/users"
      );

    return res.data;
  };

export const deleteUser =
  async (id) => {
    await api.delete(
      `/admin/users/${id}`
    );
  };

export const getReviews =
  async () => {
    const res =
      await api.get(
        "/admin/reviews"
      );

    return res.data;
  };

export const deleteReview =
  async (id) => {
    await api.delete(
      `/api/admin/reviews/${id}`
    );
  };