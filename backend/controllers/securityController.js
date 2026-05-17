const axios = require("axios");

function baseSecurityResult() {
  return {
    riskLevel: "Low",
    summary: "No obvious security issue detected in the submitted snippet.",
    vulnerabilities: [],
    bestPractices: [],
    secureCodeExample: "",
  };
}

function highestSeverity(items) {
  const order = ["Low", "Medium", "High", "Critical"];
  return items.reduce((highest, item) => {
    const current = order.indexOf(item.severity);
    return current > order.indexOf(highest) ? item.severity : highest;
  }, "Low");
}

function localSecurityScan(code = "", language = "") {
  const result = baseSecurityResult();
  const vulnerabilities = [];

  if (/(select|update|delete|insert)\s+.+\+|db\.query\([^)]*\+/i.test(code)) {
    vulnerabilities.push({
      issue: "Query injection risk",
      severity: "High",
      description:
        "The code appears to concatenate untrusted data into a database query, which can allow injection.",
      fix:
        "Use parameterized queries, prepared statements, or a query builder with bound values.",
    });
  }

  if (/innerHTML\s*=|dangerouslySetInnerHTML|document\.write/i.test(code)) {
    vulnerabilities.push({
      issue: "XSS risk",
      severity: "High",
      description:
        "The code writes content directly into HTML, which can execute attacker-controlled markup.",
      fix:
        "Render text safely, sanitize trusted HTML, or avoid raw HTML APIs.",
    });
  }

  if (/(api[_-]?key|jwt[_-]?secret|password|token|aws[_-]?secret|firebase)\s*[:=]\s*["'][^"']{6,}/i.test(code)) {
    vulnerabilities.push({
      issue: "Hardcoded secret",
      severity: "Critical",
      description:
        "A sensitive-looking key, token, password, or secret appears to be hardcoded in source code.",
      fix:
        "Move secrets to environment variables or a secret manager and rotate the exposed value.",
    });
  }

  if (/jwt\.sign\([^)]*["'][^"']+["']|secret\s*[:=]\s*["']secret["']/i.test(code)) {
    vulnerabilities.push({
      issue: "Weak JWT secret",
      severity: "High",
      description:
        "JWT signing appears to use a short or hardcoded secret, which can allow token forgery.",
      fix:
        "Use a long random secret from environment configuration and rotate any exposed key.",
    });
  }

  if (/exec\(|spawn\(|eval\(|Function\(/i.test(code)) {
    vulnerabilities.push({
      issue: "Unsafe code or command execution",
      severity: "High",
      description:
        "The code uses dynamic execution APIs that can become exploitable with untrusted input.",
      fix:
        "Avoid dynamic execution, validate strict allowlists, and pass command arguments without shell interpolation.",
    });
  }

  result.vulnerabilities = vulnerabilities;
  result.riskLevel = highestSeverity(vulnerabilities);
  result.summary = vulnerabilities.length
    ? `${vulnerabilities.length} security issue(s) detected by local fallback analysis for ${language || "this"} code.`
    : result.summary;
  result.bestPractices = [
    "Validate and normalize all user input at trust boundaries.",
    "Keep secrets outside source code and rotate exposed credentials.",
    "Prefer safe framework APIs over string-built queries, HTML, or commands.",
  ];
  result.secureCodeExample = vulnerabilities.some((item) => item.issue.includes("Query"))
    ? "db.query(\"SELECT * FROM users WHERE id = ?\", [req.query.id]);"
    : "";

  return result;
}

function extractJson(text) {
  const cleaned = String(text || "").replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("AI response did not contain JSON");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

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
        model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
        temperature: 0.1,
        max_tokens: 1800,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: userPrompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    const aiText = aiRes.data?.choices?.[0]?.message?.content || "";
    const parsed = {
      ...baseSecurityResult(),
      ...extractJson(aiText),
    };

    res.json(parsed);

  } catch (err) {
    const fallback = localSecurityScan(req.body?.code || "", req.body?.language || "");
    fallback.summary =
      `${fallback.summary} AI security analysis was unavailable, so this result used local fallback checks.`;

    res.json(fallback);
  }
};
