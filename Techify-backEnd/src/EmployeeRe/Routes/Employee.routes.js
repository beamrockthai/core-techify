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

    // ✅ ตรวจสอบว่า personalInfo มีค่าหรือไม่
    if (req.body.personalInfo) {
      try {
        // 🔹 แปลง personalInfo จาก JSON string เป็น Object
        req.body.personalInfo = JSON.parse(req.body.personalInfo);
        console.log("✅ personalInfo หลังแปลง:", req.body.personalInfo);
      } catch (error) {
        console.error("❌ JSON.parse() failed:", error);
        return res
          .status(400)
          .json({ error: "Invalid JSON format in personalInfo" });
      }
    } else {
      return res.status(400).json({ error: "personalInfo is missing" });
    }

    console.log("📌 ข้อมูลที่ได้รับจาก Frontend:", req.body);
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
