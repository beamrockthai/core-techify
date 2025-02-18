const express = require("express");
const {
  createUser,
  loginUser,
  getMe,
} = require("../Controller/user.jwt.controller");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/auth/Register", createUser);
router.post("/auth/login", loginUser);
router.get("/me", authenticateToken, getMe);

module.exports = router;
