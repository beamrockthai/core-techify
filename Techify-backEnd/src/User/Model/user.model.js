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
    allowNull: false, // ไม่ให้มีค่าว่าง
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationalId: {
    type: DataTypes.STRING,
    allowNull: false,
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
    allowNull: false,
  },

  village: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  province: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  subDistrict: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  postalCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM("user", "admin"), // กำหนด Role ของผู้ใช้
    allowNull: false,
    defaultValue: "user",
  },
});
module.exports = User;
