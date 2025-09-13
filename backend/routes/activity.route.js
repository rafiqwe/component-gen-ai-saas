const express = require("express");
const router = express.Router();
const activityModel = require("../models/activity.model");
const authMeddleware = require("../middleware/authMiddleware");

router.get("/activity", authMeddleware.auth, async (req, res) => {
  //   const { userId } = req.query;
  const userId = req.user.id;
  const activities = await activityModel
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(5);
  // console.log(activities);

  res.status(200).json(activities);
});

module.exports = router;
