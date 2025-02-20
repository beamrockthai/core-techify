require("dotenv").config(); // โหลดค่าจาก .env
const app = require("./app"); // Import Express app
const sequelize = require("./src/Config/db"); // Import Sequelize instance
const PrettyError = require("pretty-error"); // ทําให้ error ใน log อ่านง่ายขึ้น

const pe = new PrettyError();

// ใช้ PrettyError เพื่อ render error
process.on("unhandledRejection", (error) => {
  console.error(error);
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
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to start the server:", error.message);
  }
})();

// ✅ Debug: แสดงเส้นทาง API ที่โหลดใน Express
console.log("✅ Listing all registered routes:");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`🔹 ${r.route.stack[0].method.toUpperCase()} ${r.route.path}`);
  }
});

// 🚀 คำสั่ง `npm run dev` เอาไว้รันโปรเจค
