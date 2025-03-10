require("dotenv").config(); // โหลดค่าจาก .env
const app = require("./app"); // Import Express app
const sequelize = require("./src/Config/db"); // Import Sequelize instance
const PrettyError = require("pretty-error"); // ทําให้ error ใน log อ่านง่ายขึ้น
const debug = require("debug")("app:routes");

const pe = new PrettyError();

// ใช้ PrettyError เพื่อ render error
process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "Unhandled Rejection at:",
    promise,
    "reason:",
    pe.render(reason)
  );
});

// เชื่อมต่อกับฐานข้อมูล
(async () => {
  try {
    await sequelize.sync({ force: false, alter: true }); // ปรับให้เหมาะกับ Production

    // เริ่มต้นเซิร์ฟเวอร์
    const PORT = process.env.PORT || 3000; // ใช้ Render PORT
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to start the server:", error.message);
  }
})();

// ✅ Debug: แสดงเส้นทาง API ที่โหลดใน Express
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    debug(`🔹 ${r.route.stack[0].method.toUpperCase()} ${r.route.path}`);
  }
});

// 🚀 ป้องกัน Process ค้างเมื่อปิดเซิร์ฟเวอร์
process.on("SIGINT", async () => {
  console.log("🛑 Server is shutting down...");
  await sequelize.close();
  process.exit(0);
});
