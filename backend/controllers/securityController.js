const axios = require("axios");

exports.scanSecurity = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Code is required" });
    }

    const systemPrompt = `You are a security analysis API. You MUST respond with ONLY a raw JSON object.
No markdown. No explanation. No backticks. No text before or after.
If you deviate from JSON format, the response will be rejected.

Always use exactly this structure:
{
  "riskLevel": "Low | Medium | High | Critical",
  "summary": "one sentence describing the overall security posture",
  "vulnerabilities": [
    {
      "issue": "name of the vulnerability",
      "severity": "Low | Medium | High | Critical",
      "description": "one sentence explaining the risk",
      "fix": "one sentence explaining how to fix it"
    }
  ],
  "bestPractices": ["practice 1", "practice 2"],
  "secureCodeExample": "corrected code snippet as a string"
}`;

    const userPrompt = `Review this ${language} code for security vulnerabilities and return the JSON object:\n\`\`\`\n${code}\n\`\`\``;

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
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    let aiText = aiRes.data?.choices?.[0]?.message?.content || "";

    // Clean response (same as review controller)
    aiText = aiText.replace(/```json|```/g, "").trim();
    const start = aiText.indexOf("{");
    const end   = aiText.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      aiText = aiText.substring(start, end + 1);
    }

    let parsed;
    try {
      parsed = JSON.parse(aiText);
    } catch {
      console.error("JSON parse error:", aiText);
      parsed = {
        riskLevel: "Unknown",
        summary: "AI response could not be parsed",
        vulnerabilities: [],
        bestPractices: [],
        secureCodeExample: "",
      };
    }

    res.json(parsed);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Security analysis failed" });
  }
};