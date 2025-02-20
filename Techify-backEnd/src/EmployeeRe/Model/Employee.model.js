const { DataTypes } = require("sequelize"); // ใช้ในการกําหนดฟิวของตารางนะครับ
const sequelize = require("../../Config/db"); // เรียกใช้งานฐานข้อมูล

// Import Model
const Job = require("../../Jop/Model/job.model");
const User = require("../../User/Model/user.model");

const Employee = sequelize.define("Employee", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  // 🔹 เชื่อมกับ Users (UUID) 🔹
  userId: {
    type: DataTypes.UUID, // ต้องตรงกับ Users.id
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },

  // 🔹 เชื่อมกับ Jobs (UUID) 🔹
  jobId: {
    type: DataTypes.UUID, // ต้องตรงกับ Jobs.id
    allowNull: false,
    references: {
      model: Job,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },

  //Image Profile
  profileImage: {
    type: DataTypes.STRING, // เก็บ URL ของรูปโปรไฟล์
    allowNull: true,
  },

  // 🔹 ไฟล์แนบ 🔹
  attachedFiles: {
    type: DataTypes.JSON, // เก็บไฟล์ทุกประเภท เช่น บัตรประชาชน, ทะเบียนบ้าน ฯลฯ
    allowNull: true,
  },

  // 🔹 ข้อมูลส่วนตัว 🔹
  personalInfo: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  // 🔹 ประวัติการศึกษา 🔹
  educationHistory: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  // 🔹 ประวัติการทำงาน 🔹
  workHistory: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  // 🔹 ความสามารถพิเศษ 🔹
  specialSkills: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected"),
    defaultValue: "pending",
  },
});

// Relation Ship User and Job
Employee.belongsTo(User, { foreignKey: "userId" });
Employee.belongsTo(Job, { foreignKey: "jobId" });

module.exports = Employee;
