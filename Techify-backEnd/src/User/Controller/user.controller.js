const User = require("../Model/user.model");
const bcrypt = require("bcrypt"); // ฟังก์ชันเข้ารหัส

//create function ก่อน
exports.createUser = async (req, res) => {
  try {
    // เข้ารหัสรหัสผ่าน
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // สร้าง User ใหม่
    const user = await User.create(req.body);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get id
exports.getIdUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user, // คืน Body ทั้งหมด
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get all
exports.getAllUser = async (req, res) => {
  // ดู User All ดีๆ เพิ่ม s
  try {
    const users = await User.findAll();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get Update
exports.getUpdateUser = async (req, res) => {
  try {
    // ดึง ID จาก URL
    const userId = req.params.id;

    // ค้นหา Job ที่ต้องการแก้ไข
    const user = await User.findByPk(userId);

    // ตรวจสอบว่าพบข้อมูลหรือไม่
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // อัปเดตข้อมูล
    const updatedUser = await user.update(req.body); // ใช้ req.body เป็นข้อมูลใหม่

    // ส่งข้อมูลที่อัปเดตกลับ
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get Delete
exports.deleteUser = async (req, res) => {
  try {
    // ดึง ID จาก URL
    const userId = req.params.id;

    // ค้นหา Job ที่ต้องการลบ
    const user = await User.findByPk(userId);

    // ตรวจสอบว่าพบข้อมูลหรือไม่
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // ลบข้อมูล
    await user.destroy();

    // ส่งข้อความยืนยันการลบ
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Login User
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

    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
