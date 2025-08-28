const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");

module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, rolle } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
      rolle,
    });

    const token = user.generateAuthToken();

    res.cookie("token", token);

    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.cookie("token", token, { httpOnly: true });

    user.password = undefined;

    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    res.clearCookie("token");
    res.status(200).json({ message: "Logged Out" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports.changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const email = req.user.email;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { oldPassword, newPassword } = req.body;

    // Compare old password
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash new password
    user.password = await userModel.hashPassword(newPassword);
    // Update passwordChangedAt
    user.passwordChangedAt = new Date();
    await user.save();
    res.status(200).json({
      message: "Password updated successfully. Please log in again.",
    });
  } catch (error) {
    console.error("Error change password user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstname, email, lastname } = req.body;
    const OldEmail = req.user.email;
    if (!firstname || !email) {
      req.status(400).json({ message: "All fields are required" });
    }
    const isEmailAvailable = userModel.findOne({ email });
    if (isEmailAvailable) {
      req.status(400).json({ message: " This email is already exists" });
    }

    const updatedUserDetails = await userModel.findOneAndUpdate(
      {
        email: OldEmail,
      },
      {
        fullname: {
          firstname,
          lastname,
        },
        email,
      }
    );

    req.status(200).json(updatedUserDetails);
  } catch (error) {
    console.error("Error Update profile user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.changeProfile = async (req, res) => {
  const imageBuffer = req.file?.buffer;
  const user = req.user;
  if (!imageBuffer) {
    return res.status(400).json({ message: "Image is required." });
  }

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { email: user.email },
      { profileImage: imageBuffer },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Profile image updated successfully." });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
