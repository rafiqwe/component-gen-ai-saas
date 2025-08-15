// backend/config/gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Create the model instance
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Export functions
module.exports.generateComponentCode = async (prompt) => {
  const system = `Return ONLY code for a single React functional component using Tailwind CSS. No backticks, no commentary. Export default the component. Use concise, accessible markup.`;
  const res = await model.generateContent([system, prompt]);
  return res.response.text().trim();
};
