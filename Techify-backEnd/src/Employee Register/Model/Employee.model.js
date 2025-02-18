const { DataTypes } = require("sequelize"); // ใช้ในการกําหนดฟิวของตารางนะครับ
const sequelize = require("../../Config/db"); // เรียกใช้งานฐานข้อมูล

const Employee = sequelize.define("Job", {
  firstName: {
    type: DataTypes.STRING, // กำหนดชนิดของฟิว
    allownull: false, // ไม่ให้มีค่าว่าง
  },

  lastName: {
    type: DataTypes.STRING,
    allownull: false,
  },

  nationality: {
    type: DataTypes.STRING,
    allownull: false,
  },

  ethnicity: {
    type: DataTypes.STRING,
    allownull: false,
  },

  religion: {
    type: DataTypes.STRING,
    allownull: false,
  },

  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },

  age: {
    type: DataTypes.NUMBER,
    allownull: false,
  },

  placeofBirth: {
    type: DataTypes.STRING,
    allownull: false,
  },

  houseNumber: {
    type: DataTypes.STRING,
    allownull: false,
  },

  village: {
    type: DataTypes.STRING,
    allownull: false,
  },

  alleyRoad: {
    type: DataTypes.STRING,
    allownull: false,
  },

  subDistrict: {
    type: DataTypes.STRING,
    allownull: false,
  },

  district: {
    type: DataTypes.STRING,
    allownull: false,
  },

  province: {
    type: DataTypes.STRING,
    allownull: false,
  },

  postalCode: {
    type: DataTypes.NUMBER,
    allownull: false,
  },

  phoneNumber: {
    type: DataTypes.NUMBER,
    allownull: false,
  },

  maritalStatus: {
    type: DataTypes.BOOLEAN,
    allownull: false,
  },

  husbandwifeName: {
    type: DataTypes.STRING,
    allownull: false,
  },

  Location: {
    type: DataTypes.STRING,
    allownull: false,
  },
  Location: {
    type: DataTypes.STRING,
    allownull: false,
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    allownull: false,
  },
});

module.exports = Employee;
