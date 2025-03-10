const Employee = require("../../EmployeeRe/Model/Employee.model");
const Job = require("../../Jop/Model/job.model"); // ✅ เพิ่ม import Job
const User = require("../../User/Model/user.model"); // ✅ เพิ่ม import User

// 🔹 สมัครงาน (เฉพาะคนที่ล็อกอิน)
exports.registerForJob = async (req, res) => {
  try {
    // console.log("📌 Received request body:", req.body);
    // console.log("📌 Received files:", req.files);

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

    // ✅ ตรวจสอบและแปลง personalInfo เป็น Object เสมอ
    const personalInfo =
      typeof req.body.personalInfo === "string"
        ? JSON.parse(req.body.personalInfo || "{}")
        : req.body.personalInfo || {};

    // console.log("✅ personalInfo หลังแปลง:", personalInfo);

    // ✅ ฟังก์ชันช่วยแปลงค่าที่เป็นตัวเลข ป้องกัน NaN
    const parseInteger = (value) => {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? null : parsed;
    };

    // ✅ บันทึกข้อมูลลงฐานข้อมูล
    const application = await Employee.create({
      jobId,
      userId: req.user.id,

      // 🖼️ เก็บรูปภาพ
      profileImage: req.files?.profileImage?.[0]?.filename
        ? `uploads/${req.files.profileImage[0].filename}`
        : null,
      idCardImage: req.files?.idCardImage?.[0]?.filename
        ? `uploads/${req.files.idCardImage[0].filename}`
        : null,
      houseRegistrationImage: req.files?.houseRegistrationImage?.[0]?.filename
        ? `uploads/${req.files.houseRegistrationImage[0].filename}`
        : null,
      degreeCertificateImage: req.files?.degreeCertificateImage?.[0]?.filename
        ? `uploads/${req.files.degreeCertificateImage[0].filename}`
        : null,
      transcriptImage: req.files?.transcriptImage?.[0]?.filename
        ? `uploads/${req.files.transcriptImage[0].filename}`
        : null,
      workCertificateImage: req.files?.workCertificateImage?.[0]?.filename
        ? `uploads/${req.files.workCertificateImage[0].filename}`
        : null,
      medicalCertificateImage: req.files?.medicalCertificateImage?.[0]?.filename
        ? `uploads/${req.files.medicalCertificateImage[0].filename}`
        : null,
      criminalRecordImage: req.files?.criminalRecordImage?.[0]?.filename
        ? `uploads/${req.files.criminalRecordImage[0].filename}`
        : null,
      passportImage: req.files?.passportImage?.[0]?.filename
        ? `uploads/${req.files.passportImage[0].filename}`
        : null,
      drivingLicenseImage: req.files?.drivingLicenseImage?.[0]?.filename
        ? `uploads/${req.files.drivingLicenseImage[0].filename}`
        : null,
      attachedFiles: req.files?.attachedFiles
        ? req.files.attachedFiles.map((file) => `uploads/${file.filename}`)
        : [],

      // 📝 ข้อมูลผู้สมัคร
      firstName: personalInfo.firstName || null,
      lastName: personalInfo.lastName || null,
      birthDate: personalInfo.birhDate ? new Date(personalInfo.birhDate) : null, // แปลงเป็น Date
      age: parseInteger(personalInfo.age), // ✅ ใช้ฟังก์ชันตรวจสอบค่า
      month: parseInteger(personalInfo.month), // ✅ ใช้ฟังก์ชันตรวจสอบค่า
      nationality: personalInfo.nationality || null,
      ethnicity: personalInfo.ethnicity || null,
      religion: personalInfo.religion || null,
      placeOfBirth: personalInfo.placeOfBirth || null,

      // 🏡 ที่อยู่
      houseNumber: personalInfo.houseNumber || null,
      village: personalInfo.village || null,
      subdistrict: personalInfo.subdistrict || null,
      district: personalInfo.district || null,
      province: personalInfo.province || null,
      postalCode: personalInfo.postalCode || null,
      phoneNumber: personalInfo.phoneNumber || null,

      // สถานะสมรส
      maritalStatus: personalInfo.maritalStatus || null,

      // ข้อมูลบิดามารดา
      firstNameDad: personalInfo.firstNameDad || null,
      lastNameDad: personalInfo.lastNameDad || null,
      nationalityDad: personalInfo.nationalityDad || null,
      occupationDad: personalInfo.occupationDad || null,
      firstNameMother: personalInfo.firstNameMother || null,
      lastNameMother: personalInfo.lastNameMother || null,
      nationalityMother: personalInfo.nationalityMother || null,
      occupationMother: personalInfo.occupationMother || null,

      // ผู้ติดต่อฉุกเฉิน
      firstNameEmergency: personalInfo.firstNameEmergency || null,
      lastNameEmergency: personalInfo.lastNameEmergency || null,
      phoneNumberEmergency: personalInfo.phoneNumberEmergency || null,
      houseNumberEmergency: personalInfo.houseNumberEmergency || null,
      villageEmergency: personalInfo.villageEmergency || null,
      alleyRoad: personalInfo.alleyRoad || null,
      subdistrictEmergency: personalInfo.subdistrictEmergency || null,
      districtEmergency: personalInfo.districtEmergency || null,
      provinceEmergency: personalInfo.provinceEmergency || null,

      // ประวัติการศึกษาและทำงาน
      degreeEarned: personalInfo.degreeEarned || null,
      major: personalInfo.major || null,
      gpa: personalInfo.gpa || null,
      institutionName: personalInfo.institutionName || null,
      periodofStudy: personalInfo.periodofStudy || null,
      workPlace: personalInfo.workPlace || null,
      position: personalInfo.position || null,
      lastSalary: personalInfo.lastSalary || null,
      employmentDuration: personalInfo.employmentDuration || null,
      reason: personalInfo.reason || null,
      specialSkills: personalInfo.specialSkills || null,

      // 🟢 สถานะการสมัคร
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
        // {
        //   model: User, // ✅ ดึงข้อมูล User ที่สมัคร
        //   attributes: [
        //     "firstName",
        //     "lastName",
        //     "email",
        //     "phoneNumber",
        //     "nationalId",
        //     "birhDate",
        //     "houseNumber",
        //     "village",
        //     "province",
        //     "district",
        //     "subDistrict",
        //     "postalCode",
        //   ], // ✅ เอาเฉพาะฟิลด์ที่ต้องใช้
        // },
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

// 🔹 ดึงข้อมูลการสมัครงานทั้งหมด (Admin เท่านั้น)
exports.getAllRegisterJobs = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      // ✅ เฉพาะแอดมินเท่านั้นที่สามารถเข้าถึง
      return res.status(403).json({
        success: false,
        message: "Forbidden: Only admins can access this data",
      });
    }

    // ค้นหาทุกใบสมัคร พร้อมข้อมูลของ User และ Job
    const applications = await Employee.findAll({
      include: [
        {
          model: Job,
          attributes: ["id", "JobName", "Description", "Location"], // ✅ ดึงข้อมูลตำแหน่งงาน
        },
        {
          model: User,
          attributes: [
            "id",
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
          ], // ✅ ดึงข้อมูลผู้สมัคร
        },
      ],
      order: [["createdAt", "DESC"]], // ✅ เรียงลำดับจากล่าสุด -> เก่าสุด
    });

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error("❌ Error in getAllRegisterJobs:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
