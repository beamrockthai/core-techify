const express = require("express");
const {
  getAllUser,
  getIdUser,
  getUpdateUser,
  deleteUser,
} = require("../Controller/user.controller");

const router = express.Router();

router.get("/User/:id", getIdUser);
router.get("/Users", getAllUser);
router.put("/User/:id", getUpdateUser);
router.delete("/User/:id", deleteUser);

module.exports = router;
//DER
