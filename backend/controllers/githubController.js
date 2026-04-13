const axios =
  require("axios");

exports.reviewGithubRepo =
  async (req, res) => {
    try {
      const { repoUrl } =
        req.body;

      if (!repoUrl) {
        return res.status(400).json({
          message:
            "Repo URL required",
        });
      }

      const parts =
        repoUrl
          .replace(
            "https://github.com/",
            ""
          )
          .split("/");

      const owner =
        parts[0];

      const repo =
        parts[1];

      const repoData =
        await axios.get(
          `https://api.github.com/repos/${owner}/${repo}`
        );

      const aiResponse =
        await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model:
              "llama-3.1-8b-instant",

            messages: [
              {
                role: "system",
                content: `
Analyze GitHub repository metadata professionally.

Return JSON:
{
 "summary":"",
 "quality":"",
 "security":"",
 "suggestions":[]
}
`,
              },

              {
                role: "user",
                content: `
Repo Name:
${repoData.data.name}

Description:
${repoData.data.description}

Language:
${repoData.data.language}

Stars:
${repoData.data.stargazers_count}

Forks:
${repoData.data.forks_count}
`,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            },
          }
        );

      const result =
        JSON.parse(
          aiResponse.data
            .choices[0]
            .message
            .content
        );

      res.json(result);

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });
    }
  };