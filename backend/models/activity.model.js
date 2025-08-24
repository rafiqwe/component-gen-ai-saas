const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
