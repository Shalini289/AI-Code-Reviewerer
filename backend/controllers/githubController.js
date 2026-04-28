const axios = require("axios");

exports.reviewGithubRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    // ✅ 1. Validate input
    if (!repoUrl || !repoUrl.includes("github.com")) {
      return res.status(400).json({
        message: "Valid GitHub repo URL required",
      });
    }

    // ✅ 2. Clean & normalize URL (handles /tree/main, /issues etc.)
    const cleanUrl = repoUrl
      .replace("https://github.com/", "")
      .replace("http://github.com/", "")
      .split("?")[0];

    const parts = cleanUrl.split("/");

    if (parts.length < 2) {
      return res.status(400).json({
        message: "Invalid GitHub repo format",
      });
    }

    const owner = parts[0];
    const repo = parts[1];

    // ✅ 3. Fetch repo metadata from GitHub
    let repoData;
    try {
      repoData = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
        }
      );
    } catch (err) {
      return res.status(400).json({
        message: "GitHub repo not found or inaccessible",
      });
    }

    const data = repoData.data;

    // ✅ 4. Prepare prompt for AI
    const prompt = `
You are a senior software architect reviewing a GitHub repository.

Analyze the repository using the provided metadata and return ONLY valid JSON in this exact format:

{
  "summary": "",
  "healthScore": 0,
  "codeQuality": "",
  "architecture": "",
  "security": "",
  "documentation": "",
  "maintainability": "",
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Rules:
- "healthScore" must be an integer from 1 to 10
- Keep explanations short (1–2 sentences max)
- Use simple, clear language
- Focus on practical insights
- Arrays must contain short bullet points
- If no issue, return empty array []
- DO NOT include any text outside JSON
- DO NOT add markdown, comments, or explanations

Evaluate based on:
- Repo structure and organization
- Language and ecosystem best practices
- Maintainability and scalability
- Security risks (general patterns)
- Documentation quality

Repository Info:
Name: ${data.name}
Description: ${data.description || "No description"}
Primary Language: ${data.language}
Stars: ${data.stargazers_count}
Forks: ${data.forks_count}
Open Issues: ${data.open_issues_count}
`;

    // ✅ 5. Call Groq AI
    let aiResponse;
    try {
      aiResponse = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You are a senior software engineer. Always return valid JSON only.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log("AI ERROR:", err.message);
      return res.status(500).json({
        message: "AI service failed",
      });
    }

    const aiText =
      aiResponse.data?.choices?.[0]?.message?.content || "";

    // ✅ 6. Safe JSON parsing
    let parsed;

    try {
      parsed = JSON.parse(aiText);
    } catch (err) {
      parsed = {
        summary: aiText,
        healthScore: 5,
        codeQuality: "",
        architecture: "",
        security: "",
        documentation: "",
        maintainability: "",
        strengths: [],
        weaknesses: [],
        suggestions: [],
      };
    }

    // ✅ 7. Final structured response
    return res.json(parsed);

  } catch (err) {
    console.log("SERVER ERROR:", err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};