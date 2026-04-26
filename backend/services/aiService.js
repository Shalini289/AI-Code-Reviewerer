const axios = require("axios");

const reviewWithAI = async (
  code,
  language
) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",
            content: `
You are a senior software engineer and code reviewer.

Analyze the given code and ONLY return valid JSON in this exact format:
{
  "summary": "",
  "bugs": [],
  "performance": "",
  "readability": "",
  "bestPractices": [],
  "security": "",
  "improvements": [],
   "complexity": {
      "time": "O(n)",
      "space": "O(1)"
  }
}
 
Guidelines:
- Be concise and clear
- Avoid long paragraphs
- Use simple language
- Focus on actionable insights
- If no issue, return empty array []
- Do NOT add extra text outside JSON

Explain like:
- A beginner should understand
- A professional should find it useful

DO NOT RETURN ANY EXTRA TEXT.
`,
          },

          {
            role: "user",
            content: `
Language: ${language}

Code:
${code}
`,
          },
        ],
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return JSON.parse(
      response.data.choices[0]
        .message.content
    );

  } catch (error) {
    console.error(error);

    throw new Error(
      "AI Review Failed"
    );
  }
};

module.exports = reviewWithAI;