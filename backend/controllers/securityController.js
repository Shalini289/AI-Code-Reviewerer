const axios =
  require("axios");

exports.scanSecurity =
  async (req, res) => {
    try {
      const {
        code,
        language,
      } = req.body;

      const response =
        await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model:
              "llama-3.1-8b-instant",

            messages: [
              {
                role: "system",
                content: `
You are a senior security engineer.

Analyze the following code for security vulnerabilities and return ONLY valid JSON:

{
  "riskLevel": "",
  "summary": "",
  "vulnerabilities": [
    {
      "issue": "",
      "severity": "",
      "description": "",
      "fix": ""
    }
  ],
  "bestPractices": [],
  "secureCodeExample": ""
}

Rules:
- "riskLevel" must be: Low, Medium, High, or Critical
- "severity" must be: Low, Medium, High, or Critical
- Keep explanations short and simple
- Focus only on real security issues (no general advice)
- Each vulnerability must include a fix
- If no vulnerabilities → return empty array []
- "secureCodeExample" should be improved version of code (short)
- DO NOT include any text outside JSON
`,
              },

              {
                role: "user",
                content: `
Language:${language}

${code}
`,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
              "Content-Type":
                "application/json",
            },
          }
        );

      let aiText =
        response.data
          .choices[0]
          .message
          .content;

      let parsed;

      try {
        parsed =
          JSON.parse(aiText);
      } catch {
        parsed = {
          riskLevel:
            "Unknown",
            summary:
            "Not Available",
          vulnerabilities:
            [],
          bestPractices:
            [],
            secureCodeExample:
            "",
        };
      }

      res.json(parsed);

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };