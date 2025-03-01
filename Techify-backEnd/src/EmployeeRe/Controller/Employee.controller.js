const Employee = require("../../EmployeeRe/Model/Employee.model");
const Job = require("../../Jop/Model/job.model"); // ✅ เพิ่ม import Job
const User = require("../../User/Model/user.model"); // ✅ เพิ่ม import User

// 🔹 สมัครงาน (เฉพาะคนที่ล็อกอิน)
exports.registerForJob = async (req, res) => {
  try {
    console.log("📌 Received request body:", req.body);
    console.log("📌 Received files:", req.files);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const jobId = req.body.jobId ? req.body.jobId.trim() : null;
    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "jobId is required" });
    }

    const allowedStatuses = ["pending", "accepted", "rejected"];
    const status = req.body.status
      ? req.body.status.replace(/^"(.*)"$/, "$1")
      : "pending";

    if (!allowedStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const application = await Employee.create({
      jobId,
      userId: req.user.id,
      profileImage: req.files?.profileImage
        ? `uploads/${req.files.profileImage[0].filename}`
        : null,
      idCardImage: req.files?.idCardImage
        ? `uploads/${req.files.idCardImage[0].filename}`
        : null,
      houseRegistrationImage: req.files?.houseRegistrationImage
        ? `uploads/${req.files.houseRegistrationImage[0].filename}`
        : null,
      degreeCertificateImage: req.files?.degreeCertificateImage
        ? `uploads/${req.files.degreeCertificateImage[0].filename}`
        : null,
      transcriptImage: req.files?.transcriptImage
        ? `uploads/${req.files.transcriptImage[0].filename}`
        : null,
      workCertificateImage: req.files?.workCertificateImage
        ? `uploads/${req.files.workCertificateImage[0].filename}`
        : null,
      medicalCertificateImage: req.files?.medicalCertificateImage
        ? `uploads/${req.files.medicalCertificateImage[0].filename}`
        : null,
      criminalRecordImage: req.files?.criminalRecordImage
        ? `uploads/${req.files.criminalRecordImage[0].filename}`
        : null,
      passportImage: req.files?.passportImage
        ? `uploads/${req.files.passportImage[0].filename}`
        : null,
      drivingLicenseImage: req.files?.drivingLicenseImage
        ? `uploads/${req.files.drivingLicenseImage[0].filename}`
        : null,
      attachedFiles: req.files?.attachedFiles
        ? req.files.attachedFiles.map((file) => `uploads/${file.filename}`)
        : [],
      personalInfo: req.body.personalInfo
        ? JSON.parse(req.body.personalInfo)
        : null,
      additionalPersonalInfo: req.body.additionalPersonalInfo
        ? JSON.parse(req.body.additionalPersonalInfo)
        : null,
      currentAddress: req.body.currentAddress
        ? JSON.parse(req.body.currentAddress)
        : null,
      emergencyContact: req.body.emergencyContact
        ? JSON.parse(req.body.emergencyContact)
        : null,
      educationHistory: req.body.educationHistory
        ? JSON.parse(req.body.educationHistory)
        : null,
      workHistory: req.body.workHistory
        ? JSON.parse(req.body.workHistory)
        : null,
      specialSkills: req.body.specialSkills,
      status: status,
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    console.error("❌ Error in registerForJob:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 ดูรายการสมัครงานของตัวเอง พร้อมข้อมูลของงานที่สมัคร
exports.getRegisterJob = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userId = req.user.id;
    const applications = await Employee.findAll({
      where: { userId },
      include: [
        {
          model: Job,
          attributes: ["id", "JobName", "Description", "Location"], // ✅ ดึงข้อมูลงานที่สมัคร
        },
        {
          model: User, // ✅ ดึงข้อมูล User ที่สมัคร
          attributes: [
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "nationalId",
            "birhDate",
            "houseNumber",
            "village",
            "province",
            "district",
            "subDistrict",
            "postalCode",
          ], // ✅ เอาเฉพาะฟิลด์ที่ต้องใช้
        },
      ],
    });

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error("❌ Error in getRegisterJob:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 อัปเดตสถานะการสมัคร (Admin เท่านั้น)
exports.updateApplicationStatus = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      // ✅ เพิ่มเงื่อนไขให้เฉพาะแอดมิน
      return res.status(403).json({
        success: false,
        message: "Forbidden: Only admins can update applications",
      });
    }

    const { status } = req.body;
    const applicationId = req.params.id;

    const application = await Employee.findByPk(applicationId);
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    console.error("❌ Error in updateApplicationStatus:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 **ยกเลิกการสมัครงานของตัวเอง**
exports.cancelRegisterJob = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userId = req.user.id;
    const applicationId = req.params.id;

    // ค้นหาใบสมัครของผู้ใช้
    const application = await Employee.findOne({
      where: { id: applicationId, userId },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found or unauthorized",
      });
    }

    // ลบใบสมัคร
    await application.destroy();

    res
      .status(200)
      .json({ success: true, message: "Application canceled successfully" });
  } catch (error) {
    console.error("❌ Error in cancelRegisterJob:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
