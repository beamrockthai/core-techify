const express = require("express");
const {
  getAllUser,
  getIdUser,
  getUpdateUser,
  deleteUser,
} = require("../Controller/user.controller");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/users", authenticateToken, authorizeRole(["admin"]), getAllUser);
router.get("/user/:id", authenticateToken, authorizeRole(["admin"]), getIdUser);
router.put(
  "/user/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  getUpdateUser
);
router.delete(
  "/user/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  deleteUser
);

module.exports = router;
