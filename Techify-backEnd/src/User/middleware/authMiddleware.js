const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("Error: No token provided"); // ✅ Debug Log
    return res
      .status(401)
      .json({ success: false, message: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ ตรวจสอบว่า req.user มีค่าหรือไม่
    console.log("Decoded User:", req.user); // ✅ Debug Log
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message); // ✅ Debug Log
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = authenticateToken;
