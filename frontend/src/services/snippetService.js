import api from "@/utils/api";

export const createSnippet =
  async (data) => {
    const res =
      await api.post(
        "/api/snippets",
        data
      );

    return res.data;
  };

export const getSnippets =
  async () => {
    const res =
      await api.get(
        "/api/snippets"
      );

    return res.data;
  };

export const deleteSnippet =
  async (id) => {
    await api.delete(
      `/api/snippets/${id}`
    );
  };