const express = require("express");
const {
  createUser,
  loginUser,
  getMe,
} = require("../Controller/user.jwt.controller");
const authenticateToken = require("../middleware/authMiddleware");
const passport = require("../../Config/passport"); // Import Passport.js
const Users = require("../Model/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ✅ 1️⃣ Route สำหรับเริ่มต้นล็อกอินผ่าน LINE
router.get(
  "/auth/line",
  passport.authenticate("line", { scope: ["profile", "openid", "email"] })
);

// ✅ 2️⃣ Route สำหรับ Callback หลังจากล็อกอินผ่าน LINE สำเร็จ
router.get(
  "/auth/line/callback",
  passport.authenticate("line", { failureRedirect: "/" }), // ให้ Passport Handle
  async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Login failed" });
    }

    // console.log("🔹 req.user:", req.user); // เช็คค่าที่ได้จาก LINE

    // รับข้อมูลจาก LINE
    const userId = req.user.userId;
    const displayName = req.user.displayName || "Unknown";
    const pictureUrl = req.user.pictureUrl || null;
    const statusMessage = req.user.statusMessage || "";

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId" });
    }

    try {
      // 🔹 ค้นหา User ใน PostgreSQL
      let user = await Users.findOne({ where: { lineId: userId } });

      // 🔹 ถ้าไม่มีให้สร้างใหม่
      if (!user) {
        user = await Users.create({
          lineId: userId,
          name: displayName,
          avatar: pictureUrl,
          status: statusMessage,
        });
      }

      // 🔹 สร้าง Token ใหม่
      const token = jwt.sign(
        { id: user.id, lineId: user.lineId, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // 🔹 Redirect ไปที่ Frontend พร้อม Token
      res.redirect(`http://localhost:5173/login-success?token=${token}`);
    } catch (error) {
      console.error("🔴 Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// ... routes อื่น ๆ เช่น register, login, getMe เป็นต้น
router.post("/auth/Register", createUser);
router.post("/auth/login", loginUser);
router.get("/me", authenticateToken, getMe);

module.exports = router;
