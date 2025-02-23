const express = require("express");
const {
  registerForJob,
  getRegisterJob,
  updateApplicationStatus,
  cancelRegisterJob,
} = require("../../EmployeeRe/Controller/Employee.controller");

const authenticateToken = require("../../User/middleware/authMiddleware");

const router = express.Router();

// ✅ สมัครงาน (ต้องล็อกอิน)
router.post(
  "/app",
  authenticateToken,
  (req, res, next) => {
    console.log("✅ Route /app Called - Received request:", req.body);
    next();
  },
  registerForJob
);

// ✅ ดูรายการสมัครของตัวเอง
router.get(
  "/getJop",
  authenticateToken,
  (req, res, next) => {
    console.log("API Called:", req.path);
    next();
  },
  getRegisterJob
);

// ✅ อัปเดตสถานะการสมัคร (Admin เท่านั้น)
router.put("/update/:id", authenticateToken, updateApplicationStatus);

// ✅ ยกเลิกการสมัครงานของตัวเอง
router.delete("/cancelrejob/:id", authenticateToken, cancelRegisterJob);

module.exports = router;
