require("dotenv").config(); // โหลดค่าจาก .env
const app = require("./app"); // Import Express app
const sequelize = require("./src/Config/db"); // Import Sequelize instance

// เชื่อมต่อกับฐานข้อมูล
(async () => {
  try {
    await sequelize.sync(); // สร้างตารางในฐานข้อมูลถ้ายังไม่มี
    console.log("Database synced");

    // เริ่มต้นเซิร์ฟเวอร์
    const PORT = process.env.APP_PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error.message);
  }
})();
