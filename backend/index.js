require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk/index.mjs");

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/review", async (req, res) => {
  try {
  const { code, language } = req.body;

   const prompt = `
You are a senior software engineer.

The following code is written in ${language}.

Analyze and provide:

1. Bugs or logical errors
2. Optimization suggestions
3. Best practices improvements
4. Time complexity (Big-O)
5. Overall code quality score out of 10

Code:
${code}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const review =
  completion?.choices?.[0]?.message?.content ||
  "AI returned empty response.";

    res.json({ review });
  } catch (error) {
    console.error("🔥 Groq Error:", error);
    res.status(500).json({ review: "AI review failed." });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});