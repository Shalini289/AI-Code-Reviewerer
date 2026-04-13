const axios =
  require("axios");

exports.compareCode =
  async (req, res) => {
    try {
      const {
        code1,
        code2,
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
Compare the two given code snippets professionally.

Return:
1. Better Code
2. Why Better
3. Performance Comparison
4. Readability Comparison
5. Optimization Suggestions
`,
              },

              {
                role: "user",
                content: `
Language: ${language}

Code 1:
${code1}

Code 2:
${code2}
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

      res.json({
        result:
          response.data
            .choices[0]
            .message
            .content,
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };