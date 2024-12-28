const { DataTypes } = require("sequelize"); // ใช้ในการกําหนดฟิวของตารางนะครับ
const sequelize = require("../../Config/db"); // เรียกใช้งานฐานข้อมูล

const Job = sequelize.define("Job", {
  JobName: {
    type: DataTypes.STRING, // กำหนดชนิดของฟิว
    allownull: false, // ไม่ให้มีค่าว่าง
  },
  Description: {
    type: DataTypes.STRING,
    allownull: false,
  },
  Location: {
    type: DataTypes.STRING,
    allownull: false,
  },
});

module.exports = Job;
