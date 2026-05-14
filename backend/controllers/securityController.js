const axios = require("axios");

exports.scanSecurity = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Code is required" });
    }

    const systemPrompt = `You are a deterministic secure-code review API.
Return ONLY one raw JSON object. Do not return markdown, prose, comments, code fences, or text outside JSON.
Use the exact keys and value types from the schema. Use [] for no findings and "" for unavailable text.
Base every vulnerability on evidence visible in the submitted code. Do not invent packages, files, secrets, endpoints, or runtime behavior.
Prefer specific, actionable findings over generic advice.
Every vulnerability must follow this evidence standard:
- issue: short technical name, for example "NoSQL injection in login filter"
- description: include exact risky pattern and attacker impact
- fix: include the concrete safer pattern, library method, validation, or config change
- severity: choose the highest justified level, never exaggerate without exploit evidence

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

    const userPrompt = `Task: Perform a precise security review for the submitted ${language || "unknown"} code.

Severity rubric:
- Critical: exploitable remote code execution, credential exposure, authentication bypass, data loss, destructive injection, or production-wide compromise.
- High: likely exploitable injection, broken access control, unsafe auth/session handling, sensitive data exposure, or dangerous file/network operation.
- Medium: security weakness that needs context to exploit, weak validation, unsafe defaults, missing rate limits, or risky dependency/API use.
- Low: hardening, defensive coding, or minor misconfiguration.

Check specifically for:
- SQL/NoSQL/command/path/template injection
- XSS and unsafe HTML/DOM rendering
- hardcoded API keys, JWT secrets, passwords, tokens, Firebase configs, AWS credentials
- weak authentication, authorization, password reset, or session logic
- insecure crypto, weak hashing, missing salting, predictable randomness
- SSRF, unsafe redirects, unsafe file upload/read/write
- prototype pollution, object injection, unsafe deserialization
- buffer overflow or unsafe memory behavior where language allows it

Rules:
- If a risk is not present in the code, do not list it.
- Every vulnerability description must mention the concrete code pattern that caused the finding.
- secureCodeExample should include a minimal corrected snippet only when a meaningful fix is possible.
- Do not say "use best practices" unless you name the exact practice.
- If the code is too small to judge a category, leave it empty instead of guessing.
- Set riskLevel to the highest vulnerability severity; if no vulnerabilities exist, use "Low".
- For bestPractices, include only practices directly relevant to the submitted code.

Submitted code:
<<<CODE
${code}
CODE`;

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
