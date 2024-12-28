const express = require("express");
const {
  createJob,
  getAllJobs,
  getIdJob,
  getUpdateJob,
  deleteJob,
} = require("../Controller/Job.controller");

const router = express.Router();

router.post("/Job", createJob);
router.get("/Job/:id", getIdJob);
router.get("/Jobs", getAllJobs);
router.put("/Job/:id", getUpdateJob);
router.delete("/Job/:id", deleteJob);

module.exports = router;
