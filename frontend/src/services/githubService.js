import api from "@/utils/api";

export const analyzeGithubRepo = async (repoUrl) => {
  const res = await api.post("/github/analyze", {
    repoUrl,
  });

  return res.data;
};