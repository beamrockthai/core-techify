const Employee = require("../../EmployeeRe/Model/Employee.model");
const Job = require("../../Jop/Model/job.model"); // ✅ เพิ่ม import Job

// 🔹 สมัครงาน (เฉพาะคนที่ล็อกอิน)
exports.registerForJob = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const {
      jobId,
      profileImage,
      attachedFiles,
      personalInfo,
      educationHistory,
      workHistory,
      specialSkills,
    } = req.body;
    const userId = req.user.id;

    console.log("📌 Received userId for registration:", userId);
    console.log("📌 Received jobId:", jobId);
    console.log("📌 Full Request Body:", req.body);

    // ตรวจสอบว่า Job มีอยู่จริงไหม
    const jobExists = await Job.findByPk(jobId);
    if (!jobExists) {
      console.error("❌ Job not found in DB for id:", jobId);
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // ตรวจสอบว่าผู้ใช้สมัครงานนี้ไปแล้วหรือยัง
    const existingApplication = await Employee.findOne({
      where: { userId, jobId },
    });
    if (existingApplication) {
      console.log("❌ User already applied for this job:", existingApplication);
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // ✅ สมัครงาน พร้อมบันทึกข้อมูลเพิ่มเติม
    const application = await Employee.create({
      userId,
      jobId,
      profileImage,
      attachedFiles,
      personalInfo,
      educationHistory,
      workHistory,
      specialSkills,
    });

    console.log("✅ Application submitted successfully:", application);

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

    const userId = req.user.id; // ดึง `userId` จาก Token
    const applications = await Employee.findAll({
      where: { userId },
      include: [
        {
          model: Job,
          attributes: ["id", "JobName", "Description", "Location"], // ✅ ดึงข้อมูลงานที่สมัคร
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
