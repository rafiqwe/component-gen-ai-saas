// routes/usage.js
const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const authMeddleware = require("../middleware/authMiddleware");
const checkUsageReset = require("../middleware/checkUsageReset");

// Increment usage
router.post(
  "/increment",
  authMeddleware.auth,
  checkUsageReset,
  async (req, res) => {
    try {
      const user = await userModel.findById(req.user.id);

      if (user.usageCount >= user.usageLimit) {
        return res
          .status(403)
          .json({ message: "Usage limit reached for this month" });
      }

      user.usageCount += 1;
      user.usageLimit = 80;
      await user.save();

      res.json({
        usageCount: user.usageCount,
        usageLimit: user.usageLimit,
        percent: Math.round((user.usageCount / user.usageLimit) * 100),
        resetDate: user.usageResetDate,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Get usage stats
router.get("/stats",authMeddleware.auth, checkUsageReset, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
      usageCount: user.usageCount,
      usageLimit: user.usageLimit,
      percent: Math.round((user.usageCount / user.usageLimit) * 100),
      resetDate: user.usageResetDate,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
