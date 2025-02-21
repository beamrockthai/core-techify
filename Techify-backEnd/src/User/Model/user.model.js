const { DataTypes } = require("sequelize");
const sequelize = require("../../Config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: true, // ไม่ให้มีค่าว่าง
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nationalId: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  birhDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isDate: true,
    },
  },

  houseNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  village: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  province: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  district: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  subDistrict: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  postalCode: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  lineId: { type: DataTypes.STRING, unique: true, allowNull: true },

  role: {
    type: DataTypes.ENUM("user", "admin"), // กำหนด Role ของผู้ใช้
    allowNull: false,
    defaultValue: "user",
  },
});
module.exports = User;
