const genCompCode = require("../config/gemini.js");
const { validationResult } = require("express-validator");
const activityModel = require("../models/activity.model");

module.exports.generateCompController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { prompt, title } = req.body;
    const userId = req.user.id;
    if (!prompt) {
      return res.status(401).json({ message: "Prompts is required" });
    }

    const code = await genCompCode.generateComponentCode(prompt);

    await activityModel.create({
      action: `Generated component: ${title || ""}`,
      userId,
      prompt,
    });
    
    res.json({ code, title: title || "GeneratedComponent" });
  } catch (error) {
    console.error("Error generate code:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
