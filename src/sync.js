const sequelize = require("./Config/db");
const Job = require("../src/Jop/Model/job.model"); // Import Model

(async () => {
  try {
    await sequelize.sync({ force: true }); // ใช้ force: true เพื่อรีเซ็ตตาราง (ลบแล้วสร้างใหม่)
    console.log("Database synchronized: Job table created.");
  } catch (error) {
    console.error("Error synchronizing the database:", error.message);
  } finally {
    await sequelize.close(); // ปิดการเชื่อมต่อ
  }
})();

//ไว้สําหรับการทํา migration ของตาราง
//sync.js ทําการรันไฟล์นี้เพื่อสร้างตารางใหม่ โดยใช้คําสั่ง node src/sync.js
