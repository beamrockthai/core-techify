const jwt = require("jsonwebtoken");
const User = require("../Model/user.model");
const bcrypt = require("bcrypt");

// Create User (เหมือนเดิม)
exports.createrUser = async (req, res) => {
  try {
    // เข้ารหัสรหัสผ่าน
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // สร้าง User ใหม่
    const user = await User.create(req.body);

    // ✅ สร้าง JWT Token ให้ User ทันทีหลังจากสมัครสมาชิก
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token ใช้ได้ 1 วัน
    );

    res.status(200).json({
      success: true,
      message: "Register successful",
      token, // ✅ ส่ง Token กลับไปให้ Frontend ใช้งาน
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User (เพิ่ม JWT)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ตรวจสอบว่า email และ password ถูกส่งมา
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // ค้นหา User ตาม email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // ตรวจสอบความถูกต้องของรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // สร้าง JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d", // Token ใช้ได้ 1 วัน
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token, // ส่ง token กลับไปให้ Frontend ใช้งาน
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
