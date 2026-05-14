const axios = require("axios");

exports.compareCode = async (req, res) => {
  try {
    const { code1, code2, language } = req.body;

    if (!code1 || !code2) {
      return res.status(400).json({
        message: "Both code snippets are required",
      });
    }

    const systemPrompt = `You are a deterministic code comparison API.
Return ONLY one raw JSON object. No markdown, comments, code fences, or text outside JSON.
Use the exact schema keys and value types. Use [] for no items and "" only when a field is genuinely unavailable.
Compare only the submitted snippets. Do not invent missing project context.`;

    const prompt = `Task: Compare two ${language || "unknown"} code snippets for production readiness.

Schema:
{
  "winner": "Code 1 | Code 2 | Tie",
  "reason": "one concise sentence explaining the decision",
  "comparison": {
    "performance": "specific performance comparison with Big-O if inferable",
    "readability": "specific readability comparison",
    "bestPractices": "specific best-practice comparison"
  },
  "pros": {
    "code1": ["specific advantage of Code 1"],
    "code2": ["specific advantage of Code 2"]
  },
  "cons": {
    "code1": ["specific weakness of Code 1"],
    "code2": ["specific weakness of Code 2"]
  },
  "improvements": {
    "code1": ["actionable improvement for Code 1"],
    "code2": ["actionable improvement for Code 2"]
  }
}

Decision rubric:
- Correctness is weighted 40%.
- Security and unsafe edge cases are weighted 20%.
- Time/space complexity and avoidable repeated work are weighted 20%.
- Readability, maintainability, naming, and idiomatic style are weighted 15%.
- Best-practice fit for ${language || "the language"} is weighted 5%.
- Prefer simpler, safer, more maintainable code when correctness is equal.
- Use "Tie" only when neither snippet is materially better.
- Mention concrete code patterns, not vague statements.
- Each pro, con, and improvement must use this format: "Evidence -> impact -> action".
- Keep each array item under 22 words.
- If both snippets share the same weakness, list it under both cons.
- If performance cannot be inferred, say "No material performance difference visible."

Code 1:
<<<CODE_1
${code1}
CODE_1

Code 2:
<<<CODE_2
${code2}
CODE_2`;

    const aiRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        temperature: 0.1,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    let aiText =
      aiRes.data?.choices?.[0]?.message?.content || "";

    aiText = aiText.replace(/```json|```/g, "").trim();
    const start = aiText.indexOf("{");
    const end = aiText.lastIndexOf("}");

    if (start !== -1 && end !== -1) {
      aiText = aiText.substring(start, end + 1);
    }

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
