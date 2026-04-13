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
Analyze the code for security vulnerabilities.

Return ONLY JSON:

{
 "riskLevel":"",
 "vulnerabilities":[],
 "recommendations":[]
}
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
          vulnerabilities:
            [],
          recommendations:
            [],
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