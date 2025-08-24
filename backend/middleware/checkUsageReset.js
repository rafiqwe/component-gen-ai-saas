// middleware/checkUsageReset.js
const userModel = require('../models/user.model')
const checkUsageReset = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const now = new Date();
    const resetDate = new Date(user.usageResetDate);

    // If 30 days passed -> reset usage
    const diffInDays = Math.floor((now - resetDate) / (1000 * 60 * 60 * 24));
    if (diffInDays >= 30) {
      user.usageCount = 0;
      user.usageResetDate = now;
      await user.save();
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = checkUsageReset;
