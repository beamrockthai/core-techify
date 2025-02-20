const { DataTypes } = require("sequelize"); // ใช้ในการกําหนดฟิวของตารางนะครับ
const sequelize = require("../../Config/db"); // เรียกใช้งานฐานข้อมูล

const Job = sequelize.define("Job", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  JobName: {
    type: DataTypes.STRING, // กำหนดชนิดของฟิว
    allowNull: false, // ไม่ให้มีค่าว่าง
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Job;
