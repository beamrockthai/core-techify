const multer = require("multer");
const path = require("path");

// 📌 ตั้งค่า `multer` สำหรับ Employee
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// 📌 ตรวจสอบประเภทไฟล์ (อนุญาตเฉพาะ JPEG, PNG, PDF)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and PDF files are allowed!"));
  }
};

// 📌 จำกัดขนาดไฟล์ 5MB
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 📌 ตรวจสอบให้แน่ใจว่า `name` ตรงกับที่ Postman ส่งมา
module.exports = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "idCardImage", maxCount: 1 },
  { name: "houseRegistrationImage", maxCount: 1 },
  { name: "degreeCertificateImage", maxCount: 1 },
  { name: "transcriptImage", maxCount: 1 },
  { name: "workCertificateImage", maxCount: 1 },
  { name: "medicalCertificateImage", maxCount: 1 },
  { name: "criminalRecordImage", maxCount: 1 },
  { name: "passportImage", maxCount: 1 },
  { name: "drivingLicenseImage", maxCount: 1 },
  { name: "attachedFiles", maxCount: 10 }, // รองรับหลายไฟล์d
]);
