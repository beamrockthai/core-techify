const { DataTypes } = require("sequelize");
const sequelize = require("../../Config/db");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allownull: false, // ไม่ให้มีค่าว่าง
  },

  lastName: {
    type: DataTypes.STRING,
    allownull: false,
  },

  email: {
    type: DataTypes.STRING,
    allownull: false,
  },

  password: {
    type: DataTypes.STRING,
    allownull: false,
  },

  phoneNumber: {
    type: DataTypes.INTEGER,
    allownull: false,
  },
  nationalId: {
    type: DataTypes.STRING,
    allownull: false,
  },

  birhDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },

  houseNumber: {
    type: DataTypes.STRING,
    allownull: false,
  },

  village: {
    type: DataTypes.STRING,
    allownull: false,
  },

  province: {
    type: DataTypes.STRING,
    allownull: false,
  },

  district: {
    type: DataTypes.STRING,
    allownull: false,
  },

  subDistrict: {
    type: DataTypes.STRING,
    allownull: false,
  },

  postalCode: {
    type: DataTypes.INTEGER,
    allownull: false,
  },

  body: {
    type: DataTypes.JSON, // เพิ่ม เพราะว่า ถ้าฟิวที่ข้อมูลไม่เเน่นอน ให้ใช้ JSON
    allowNull: true, // สามารถเว้นว่างได้
  },
});
module.exports = User;
