const Review =require("../models/Review");
const axios = require("axios");

exports.reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    const systemPrompt = `You are a code review API. You MUST respond with ONLY a raw JSON object.
No markdown. No explanation. No backticks. No text before or after.
If you deviate from JSON format, the response will be rejected.

Always use exactly this structure:
{
  "summary": "one sentence describing what the code does",
  "bugs": ["bug description 1", "bug description 2"],
  "performance": "one sentence about performance",
  "readability": "one sentence about readability",
  "bestPractices": ["practice 1", "practice 2"],
  "security": "one sentence about security",
  "improvements": ["improvement 1", "improvement 2"]
}`;

const userPrompt = `Review this ${language} code and return the JSON object:\n\`\`\`\n${code}\n\`\`\``;

   const aiRes = await axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    model: "llama-3.1-8b-instant",
    temperature: 0.1,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user",   content: userPrompt },
    ],
  },
  {
    headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
  }
);

    let aiText =
      aiRes.data?.choices?.[0]?.message?.content || "";

    // 🔥 CLEAN RESPONSE (IMPORTANT)
  aiText = aiText.replace(/```json|```/g, "").trim();

  const start = aiText.indexOf("{");
const end = aiText.lastIndexOf("}");

  if (start !== -1 && end !== -1) {
  aiText = aiText.substring(start, end + 1);
}

    let parsed;

    try {
      parsed = JSON.parse(aiText);
    } catch (err) {
      console.log("PARSE ERROR:", aiText);

      // ✅ SAFE FALLBACK (NOT prompt)
      parsed = {
        summary: "AI response formatting issue",
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