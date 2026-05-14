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
    const systemPrompt = `You are a deterministic GitHub repository review API.
Return ONLY one raw JSON object. Do not return markdown, prose, comments, code fences, or text outside JSON.
Use the exact schema keys and value types. Use [] for no items.
Use only the provided repository metadata. Do not pretend you inspected source files, package manifests, workflows, or commits unless that data is included.
Make recommendations practical and clearly label metadata-based uncertainty.`;

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
  "suggestions": [],
  "githubAutomation": {
    "pullRequestReview": ["automatic pull request review rule"],
    "commitComments": ["commit comment that would be useful"],
    "qualityTrends": ["metric to track across commits or releases"]
  },
  "cicdIntegration": {
    "deploymentReview": ["auto-review step during deployment"],
    "pushBlockers": ["security or quality issue that should block a push"],
    "pipelineSteps": ["CI/CD workflow step to add"]
  }
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
- Pull request review automation opportunities
- Commit comment suggestions
- Code quality trends to track
- CI/CD deployment review and insecure push blockers

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
      if (!process.env.GROQ_API_KEY) {
        return res.status(500).json({
          message: "AI service is not configured",
        });
      }

      const precisePrompt = `Task: Review this GitHub repository using metadata only.

Return this exact JSON schema:
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
  "suggestions": [],
  "githubAutomation": {
    "pullRequestReview": ["automatic pull request review rule"],
    "commitComments": ["commit comment that would be useful"],
    "qualityTrends": ["metric to track across commits or releases"]
  },
  "cicdIntegration": {
    "deploymentReview": ["auto-review step during deployment"],
    "pushBlockers": ["security or quality issue that should block a push"],
    "pipelineSteps": ["CI/CD workflow step to add"]
  }
}

Scoring rubric:
- 9-10: healthy public metadata, clear description, active adoption, low visible risk.
- 7-8: mostly healthy with minor documentation, maintenance, or automation gaps.
- 5-6: moderate risk due to sparse metadata, open issues, weak description, or unclear maintenance.
- 3-4: high risk signals from metadata.
- 1-2: severe metadata risk or likely abandoned/incomplete repo.

Rules:
- healthScore must be an integer from 1 to 10.
- Keep each string concise and practical.
- Do not claim code-level vulnerabilities from metadata alone.
- If a recommendation depends on unseen source code, phrase it as "Verify..." or "Add a check for...".
- Arrays must contain short bullet-like strings.
- Each weakness must use this format: "Signal -> risk -> recommended check".
- Each suggestion must use this format: "Action -> expected benefit".
- codeQuality, architecture, security, documentation, and maintainability must each mention the metadata signal used.
- githubAutomation.pullRequestReview must be enforceable as a PR rule or checklist item.
- cicdIntegration.pipelineSteps must name a concrete CI step, such as lint, test, dependency audit, secret scan, or build.
- cicdIntegration.pushBlockers must list only issues that should actually block merge/deploy.

Repository metadata:
{
  "name": ${JSON.stringify(data.name)},
  "description": ${JSON.stringify(data.description || "")},
  "primaryLanguage": ${JSON.stringify(data.language || "")},
  "stars": ${data.stargazers_count},
  "forks": ${data.forks_count},
  "openIssues": ${data.open_issues_count},
  "visibility": ${JSON.stringify(data.visibility || "")},
  "defaultBranch": ${JSON.stringify(data.default_branch || "")},
  "createdAt": ${JSON.stringify(data.created_at || "")},
  "updatedAt": ${JSON.stringify(data.updated_at || "")},
  "pushedAt": ${JSON.stringify(data.pushed_at || "")}
}`;

      aiResponse = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.1-8b-instant",
          temperature: 0.1,
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: precisePrompt,
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

    let aiText =
      aiResponse.data?.choices?.[0]?.message?.content || "";

    aiText = aiText.replace(/```json|```/g, "").trim();

    const start = aiText.indexOf("{");
    const end = aiText.lastIndexOf("}");

    if (start !== -1 && end !== -1) {
      aiText = aiText.substring(start, end + 1);
    }

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
        githubAutomation: {
          pullRequestReview: [],
          commitComments: [],
          qualityTrends: [],
        },
        cicdIntegration: {
          deploymentReview: [],
          pushBlockers: [],
          pipelineSteps: [],
        },
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
