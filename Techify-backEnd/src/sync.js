const sequelize = require("./Config/db");
const Job = require("../src/Jop/Model/job.model"); // Import Model
const User = require("../src/User/Model/user.model"); // Import Model
const Employee = require("./EmployeeRe/Model/Employee.model");
// สร้างตาราง
(async () => {
  try {
    await sequelize.sync({ alter: true }); // ใช้ force: true เพื่อรีเซ็ตตาราง (ลบแล้วสร้างใหม่)
    console.log("Database synchronized: All tables created table created.");
  } catch (error) {
    console.error("Error synchronizing the database:", error.message);
  } finally {
    await sequelize.close(); // ปิดการเชื่อมต่อ
  }
})();

//ไว้สําหรับการทํา migration ของตาราง
//sync.js ทําการรันไฟล์นี้เพื่อสร้างตารางใหม่ โดยใช้คําสั่ง node src/sync.js
// await sequelize.sync({ alter: true }); ข้อมูลจะไม่หาย แต่ตารางจะถูกแก้ไขให้ตรงกับ Model ที่เราได้แก้ไขไว้1
