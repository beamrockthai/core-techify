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

  //idCardImage - ภาพบัตรประชาชน
  idCardImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  //houseRegistrationImage - ภาพทะเบียนบ้าน
  houseRegistrationImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  //degreeCertificateImage - ภาพประกาศนียบัตร
  degreeCertificateImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  //transcriptImage - ภาพ Transcript
  transcriptImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  //workCertificateImage - ภาพใบรับรองการทำงาน
  workCertificateImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  //medicalCertificateImage - ภาพใบรับรองแพทย์
  medicalCertificateImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  //criminalRecordImage - ภาพประวัติกาฟ
  criminalRecordImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  //passportImage - ภาพ Passport
  passportImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  //drivingLicenseImage - ภาพใบขับขี่
  drivingLicenseImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // เก็บไฟล์แนบหลายไฟล์ในรูปแบบ
  attachedFiles: {
    type: DataTypes.JSON, // เก็บไฟล์ทุกประเภท เช่น บัตรประชาชน, ทะเบียนบ้าน ฯลฯ
    allowNull: true,
  },

  // 🔹 ข้อมูลส่วนตัว 🔹
  personalInfo: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  // เพิ่มฟิลด์ที่เกี่ยวกับข้อมูลส่วนตัวจากแบบฟอร์ม
  additionalPersonalInfo: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      firstName: "",
      lastName: "",
      birthDate: "",
      age: "",
      nationality: "",
      ethnicity: "",
      religion: "",
      birthPlace: "",
      maritalStatus: "",
      spouseName: "",
      spouseNationality: "",
      spouseOccupation: "",
      fatherName: "",
      fatherNationality: "",
      fatherOccupation: "",
      motherName: "",
      motherNationality: "",
      motherOccupation: "",
    },
  },

  // 🔹 ที่อยู่ปัจจุบัน 🔹
  currentAddress: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      houseNumber: "",
      village: "",
      street: "",
      subDistrict: "",
      district: "",
      province: "",
      postalCode: "",
      phoneNumber: "",
    },
  },

  // 🔹 ที่อยู่กรณีเร่งด่วน 🔹
  emergencyContact: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      fullName: "",
      phoneNumber: "",
      houseNumber: "",
      village: "",
      street: "",
      subDistrict: "",
      district: "",
      province: "",
    },
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
