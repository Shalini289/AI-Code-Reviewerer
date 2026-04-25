import api from "@/utils/api";

export const reviewCode =
  async (data) => {
    const res =
      await api.post(
        "/api/review/code",
        data
      );

    return res.data;
  };



export const getReviewHistory =
  async () => {
    const res =
      await api.get(
        "/api/review/history"
      );

    return res.data;
  };

export const deleteReview =
  async (id) => {
    const res =
      await api.delete(
        `/api/review/${id}`
      );

    return res.data;
  };