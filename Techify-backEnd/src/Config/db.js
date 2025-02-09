const { Sequelize } = require("sequelize");
require("dotenv").config(); // โหลดค่าจาก .env

// ตรวจสอบว่าค่าจาก .env ถูกโหลดหรือไม่
console.log("DB Config:");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

// ตั้งค่า Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || "postgres", // ชื่อฐานข้อมูล (default: postgres)
  process.env.DB_USER || "postgres", // ชื่อผู้ใช้ (default: postgres)
  process.env.DB_PASSWORD || "", // รหัสผ่าน (default: ไม่มี)
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432, // แปลงเป็นตัวเลข, default: 5432
    dialect: "postgres",
    logging: false, // ปิด log query
  }
);

// ทดสอบการเชื่อมต่อ
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ GoToGundum ");
  } catch (error) {
    console.error("❌ NoToGundum:", error.message);
  }
})();

module.exports = sequelize;
