const express = require("express");
const {
  createUser,
  getAllUser,
  getIdUser,
  getUpdateUser,
  deleteUser,
  loginUser,
} = require("../Controller/user.controller");

const router = express.Router();

router.post("/User", createUser);
router.get("/User/:id", getIdUser);
router.get("/Users", getAllUser);
router.put("/User/:id", getUpdateUser);
router.delete("/User/:id", deleteUser);
router.post("/login", loginUser);

module.exports = router;
