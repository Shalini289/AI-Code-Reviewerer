const axios = require("axios");

exports.compareCode = async (req, res) => {
  try {
    const { code1, code2, language } = req.body;

    if (!code1 || !code2) {
      return res.status(400).json({
        message: "Both code snippets are required",
      });
    }

    const prompt = `
You are a senior software engineer.

Compare the two code snippets and return ONLY valid JSON:

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
- winner must be "Code 1" or "Code 2"
- Keep answers short and clear
- No text outside JSON

Language: ${language}

Code 1:
${code1}

Code 2:
${code2}
`;

    const aiRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "Return ONLY JSON" },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const aiText =
      aiRes.data?.choices?.[0]?.message?.content || "";

    let parsed;

    try {
      parsed = JSON.parse(aiText);
    } catch {
      parsed = {
        winner: "",
        reason: aiText,
        comparison: {
          performance: "",
          readability: "",
          bestPractices: "",
        },
        pros: { code1: [], code2: [] },
        cons: { code1: [], code2: [] },
        improvements: { code1: [], code2: [] },
      };
    }

    res.json(parsed);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Comparison failed",
    });
  }
};