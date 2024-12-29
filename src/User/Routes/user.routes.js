const express = require("express");
const {
  createUser,
  getAllUser,
  getIdUser,
  getUpdateUser,
  deleteUser,
} = require("../Controller/user.controller");

const router = express.Router();

router.post("/User", createUser);
router.get("/User/:id", getIdUser);
router.get("/Users", getAllUser);
router.put("/User/:id", getUpdateUser);
router.delete("/User/:id", deleteUser);

module.exports = router;
