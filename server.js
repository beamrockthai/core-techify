require("dotenv").config(); // โหลดค่าจาก .env
const app = require("./app"); // Import Express app
const sequelize = require("./src/Config/db"); // Import Sequelize instance
const PerttyError = require("pretty-error"); // ทําให้ error ในlog อ่านง่ายขึ้น

const pe = new PerttyError();

// ใช้ PrettyError เพื่อ render error
process.on("unhandledRejection", (error) => {
  console.error;
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", pe.render(reason));
});

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
