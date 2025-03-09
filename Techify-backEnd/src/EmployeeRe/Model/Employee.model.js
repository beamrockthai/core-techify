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

  // เก็บข้อมูลส่วนตัวจากแบบฟอร์ม
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  lastName: {
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

  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  month: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  nationality: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  ethnicity: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  religion: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  placeOfBirth: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  //ที่อยู่ปัจจุบัน
  houseNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  village: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  subdistrict: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  district: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  province: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  postalCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // สถานะภาพสมรส
  maritalStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // ชื่อ พ่อ
  firstNameDad: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  lastNameDad: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  nationalityDad: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  occupationDad: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // ชื่อ เเม่
  firstNameMother: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  lastNameMother: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  nationalityMother: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  occupationMother: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  //ชื่อติดต่อกรณีฉุกเฉิน
  firstNameEmergency: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  lastNameEmergency: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  phoneNumberEmergency: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  houseNumberEmergency: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  villageEmergency: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  alleyRoad: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  subdistrictEmergency: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  districtEmergency: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  provinceEmergency: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // ประวัติการศึกษา
  degreeEarned: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  major: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  gpa: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  institutionName: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  periodofStudy: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  workPlace: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  position: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  lastSalary: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  employmentDuration: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // 🔹 ความสามารถพิเศษ 🔹
  specialSkills: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  // personalInfo: {
  //   type: DataTypes.JSON,
  //   allowNull: true,
  // },

  // // เพิ่มฟิลด์ที่เกี่ยวกับข้อมูลส่วนตัวจากแบบฟอร์ม
  // additionalPersonalInfo: {
  //   type: DataTypes.JSON,
  //   allowNull: true,
  //   defaultValue: {
  //     firstName: "",
  //     lastName: "",
  //     birthDate: "",
  //     age: "",
  //     nationality: "",
  //     ethnicity: "",
  //     religion: "",
  //     birthPlace: "",
  //     maritalStatus: "",
  //     spouseName: "",
  //     spouseNationality: "",
  //     spouseOccupation: "",
  //     fatherName: "",
  //     fatherNationality: "",
  //     fatherOccupation: "",
  //     motherName: "",
  //     motherNationality: "",
  //     motherOccupation: "",
  //   },
  // },

  // // 🔹 ที่อยู่ปัจจุบัน 🔹
  // currentAddress: {
  //   type: DataTypes.JSON,
  //   allowNull: true,
  //   defaultValue: {
  //     houseNumber: "",
  //     village: "",
  //     street: "",
  //     subDistrict: "",
  //     district: "",
  //     province: "",
  //     postalCode: "",
  //     phoneNumber: "",
  //   },
  // },

  // // 🔹 ที่อยู่กรณีเร่งด่วน 🔹
  // emergencyContact: {
  //   type: DataTypes.JSON,
  //   allowNull: true,
  //   defaultValue: {
  //     fullName: "",
  //     phoneNumber: "",
  //     houseNumber: "",
  //     village: "",
  //     street: "",
  //     subDistrict: "",
  //     district: "",
  //     province: "",
  //   },
  // },

  // // 🔹 ประวัติการศึกษา 🔹
  // educationHistory: {
  //   type: DataTypes.JSON,
  //   allowNull: true,
  // },

  // // 🔹 ประวัติการทำงาน 🔹
  // workHistory: {
  //   type: DataTypes.JSON,
  //   allowNull: true,
  // },

  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected"),
    defaultValue: "pending",
  },
});

// Relation Ship User and Job
Employee.belongsTo(User, { foreignKey: "userId" });
Employee.belongsTo(Job, { foreignKey: "jobId" });

module.exports = Employee;
