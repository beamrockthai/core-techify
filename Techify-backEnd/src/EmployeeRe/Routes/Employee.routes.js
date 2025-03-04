const express = require("express");
const {
  registerForJob,
  getRegisterJob,
  updateApplicationStatus,
  cancelRegisterJob,
  getAllRegisterJobs,
} = require("../../EmployeeRe/Controller/Employee.controller");

const authenticateToken = require("../../User/middleware/authMiddleware");
const uploadMiddleware = require("../../EmployeeRe/middleware/uploadMiddleware");
const router = express.Router();

// ✅ สมัครงาน (ต้องล็อกอิน)
router.post(
  "/register",
  authenticateToken, // ✅ ตรวจสอบ Token
  uploadMiddleware, // ✅ อัปโหลดไฟล์
  (req, res, next) => {
    console.log("✅ Route /register Called - Received request:", req.body);
    console.log("✅ Received files:", req.files);
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

router.get("/allregisterjob", authenticateToken, getAllRegisterJobs);
module.exports = router;
