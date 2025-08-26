const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("rolle")
      .isIn(["Frontend Developer", "Full Stack Developer", "Backend Developer"])
      .withMessage("Invalid Rolle"),
  ],
  userController.registerUser
);

router.get("/profile", authMiddleware.auth, userController.getUserProfile);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);
router.post(
  "/change-password",
  authMiddleware.auth,
  [
    body("oldPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.changePassword
);

router.post(
  "/update-profile",
  authMiddleware.auth,
  [
    body("firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("email")
      .isLength({ min: 6 })
      .withMessage("Email must be at least 6 characters long"),
  ],
  userController.updateProfile
);

router.get("/logout", authMiddleware.auth, userController.logoutUser);

router.post(
  "/change-profile-image",
  authMiddleware.auth,
  upload.single("image"),
  userController.changeProfile
);

router.get("/profile-image", authMiddleware.auth, async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user.profileImage) {
      return res.status(404).send("Image not found");
    }

    const buffer = Buffer.from(user.profileImage);
    res.set("Content-Type", "image/jpeg"); // adjust if using png/webp/etc.
    res.send(buffer);
  } catch (err) {
    console.error("Image fetch error:", err);
    res.status(500).send("Error loading image");
  }
});

module.exports = router;
