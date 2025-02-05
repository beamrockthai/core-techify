const express = require("express");
const { createrUser, loginUser } = require("../Controller/user.jwt.controller");

const router = express.Router();

router.post("/auth/Register", createrUser);
router.post("/auth/login", loginUser);

module.exports = router;
