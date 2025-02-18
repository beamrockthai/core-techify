const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Model/user.model");

// Register User
exports.createUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const user = await User.create(req.body);
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .json({ success: true, message: "Register successful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Me

exports.getMe = async (req, res) => {
  try {
    // ตรวจสอบว่ามี user หรือไม่
    if (!req.user) {
      console.error("❌ Error: req.user is undefined");
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    console.log("🔍 Fetching user with ID:", req.user.id); // Debug Log

    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "nationalId",
        "birhDate",
        "houseNumber",
        "village",
        "province",
        "district",
        "subDistrict",
        "postalCode",
        "role",
      ],
    });

    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!user) {
      console.error("❌ Error: User not found for ID", req.user.id);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("✅ User found:", user.toJSON()); // Debug Log
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("❌ Server error in getMe:", error.message); // Debug Log
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
