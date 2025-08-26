const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const generateCompoController = require("../controllers/generate.controller.js");
const { body } = require("express-validator");

router.post(
  "/",
  authMiddleware.auth,
  body("prompt")
    .isLength({ min: 10 })
    .withMessage("First name must be at least 10 characters long"),
  generateCompoController.generateCompController
);

module.exports = router;
