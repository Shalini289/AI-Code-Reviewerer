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
You are a senior software engineer.

Compare the following two code snippets and return ONLY valid JSON:

{
  "winner": "",
  "reason": "",
  "comparison": {
    "performance": "",
    "readability": "",
    "bestPractices": ""
  },
  "pros": {
    "code1": [],
    "code2": []
  },
  "cons": {
    "code1": [],
    "code2": []
  },
  "improvements": {
    "code1": [],
    "code2": []
  }
}

Rules:
- "winner" must be "Code 1" or "Code 2"
- Be concise (short sentences)
- Use simple language
- Avoid long paragraphs
- Suggestions must be actionable
- If no issue, return empty array []
- DO NOT return anything outside JSON
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

      let aiText =
        response.data
          .choices[0]
          .message
          .content;

      console.log(
        "RAW AI:",
        aiText
      );

      let parsed;

      try {
        parsed =
          JSON.parse(aiText);
      } catch {
        parsed = {
          winner:
            aiText,
          reason:
            "Not Available",
          comparison:[],
          pros: [],
          cons: [],
          improvements:[],
        };
      }

      res.json({
        winner:
          parsed.winner ||
          "",
        reason:
          parsed.reason ||
          "",
        comparison:
          parsed.comparison ||
          [],
        pros:
          parsed.pros ||
          [],
          cons: 
          parsed.cons ||
          [],
           improvements:
           parsed. improvements || 
           [],
      });

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });
    }
  };