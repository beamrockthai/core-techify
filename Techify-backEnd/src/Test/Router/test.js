const express = require("express");
const router = express.Router();
const { read, list, create, update, remove } = require("../Controller/test");

router.get("/test", list);
router.get("/test/:id", read);
router.post("/test", create);
router.put("/test", update);
router.delete("/test", remove);

module.exports = router;
