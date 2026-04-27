const Review =require("../models/Review");
const axios = require("axios");


exports.reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({
        message: "Code is required",
      });
    }

    const prompt = `
You are a senior software engineer.

Analyze the code and return ONLY valid JSON:

{
  "summary": "",
  "bugs": [],
  "performance": "",
  "readability": "",
  "bestPractices": [],
  "security": "",
  "improvements": []
}

Rules:
- Be concise
- Use simple language
- No text outside JSON

Language: ${language}
Code:
${code}
`;

    const aiRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "Return ONLY valid JSON",
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
        summary: aiText,
        bugs: [],
        performance: "",
        readability: "",
        bestPractices: [],
        security: "",
        improvements: [],
      };
    }

    res.json(parsed);

  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Review failed",
    });
  }
};

exports.getReviewHistory =
  async (req, res) => {
    try {
      const reviews =
        await Review.find({
          user: req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        reviews
      );

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };
  exports.deleteReview =
  async (req, res) => {
    try {
      await Review.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Deleted Successfully",
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };