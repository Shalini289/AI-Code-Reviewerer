import api from "@/utils/api";

export const reviewGithubRepo = async (repoUrl) => {
  const res = await api.post("/api/github/review", {
    repoUrl,
  });

  return res.data;
};