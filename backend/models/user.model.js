const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
      },
      lastname: {
        type: String,
        minlength: [3, "First name must be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    usageLimit: {
      type: Number,
      default: 50,
    }, // free plan = 100 per month
    usageResetDate: {
      type: Date,
      default: Date.now,
    }, // when usage resets
    passwordChangedAt: {
      type: Date,
    },
    rolle: {
      type: String,
      default: "Frontend Developer",
      enum: ["Frontend Developer", "Full Stack Developer", "Backend Developer"],
      required: true,
    },
    plan: {
      type: String,
      default: "Free",
      enum: ["Pro", "Free", "Team"],
    },
    profileImage: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET);
  return token;
};

UserSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
