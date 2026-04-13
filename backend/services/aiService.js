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
You are an expert software engineer.

Analyze the given code and ONLY return valid JSON in this exact format:

{
  "bugs": ["bug1", "bug2"],
  "optimizations": ["opt1", "opt2"],
  "security": ["security1"],
  "bestPractices": ["practice1"],
  "complexity": {
      "time": "O(n)",
      "space": "O(1)"
  }
}

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