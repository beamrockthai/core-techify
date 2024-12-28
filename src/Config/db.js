const { Sequelize } = require("sequelize");
require("dotenv").config(); // โหลดค่าจาก .env

// ตั้งค่า Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME, // ชื่อฐานข้อมูล
  process.env.DB_USER, // ชื่อผู้ใช้
  process.env.DB_PASSWORD, // รหัสผ่าน
  {
    host: process.env.DB_HOST, // โฮสต์
    port: process.env.DB_PORT, // พอร์ต
    dialect: "postgres", // ใช้ PostgreSQL
    logging: false, // ปิดการ log query
  }
);

// ทดสอบการเชื่อมต่อ
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL using Sequelize");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
})();

module.exports = sequelize;
