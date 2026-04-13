import api from "@/utils/api";

export const reviewCode =
  async (data) => {
    const res =
      await api.post(
        "/review/code",
        data
      );

    return res.data;
  };



export const getReviewHistory =
  async () => {
    const res =
      await api.get(
        "/review/history"
      );

    return res.data;
  };

export const deleteReview =
  async (id) => {
    const res =
      await api.delete(
        `/review/${id}`
      );

    return res.data;
  };