const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const componentController = require("../controllers/component.controller");
const { body } = require("express-validator");

router.get("/", authMiddleware.auth, componentController.getComponent);

router.post(
  "/",
  authMiddleware.auth,
  [
    body("prompt")
      .isLength({ min: 10 })
      .withMessage({ message: "Prompt must be at least 10 characters long" }),
    body("code").isString().withMessage({ message: "Code must be a string" }),
    body("title")
      .isLength({ min: 3 })
      .withMessage({ message: "title must be at least 3 characters log" }),
  ],
  componentController.saveComponent
);

router.delete("/:id", authMiddleware.auth, componentController.deleteComponent);

module.exports = router;
