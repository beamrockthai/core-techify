const Job = require("../Model/Employee.model"); //import model มาใช้

//create function ก่อน
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//Get id
exports.getIdJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      data: job, // คืน Body ทั้งหมด
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get all
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get Update
exports.getUpdateJob = async (req, res) => {
  try {
    // ดึง ID จาก URL
    const jobId = req.params.id;

    // ค้นหา Job ที่ต้องการแก้ไข
    const job = await Job.findByPk(jobId);

    // ตรวจสอบว่าพบข้อมูลหรือไม่
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // อัปเดตข้อมูล
    const updatedJob = await job.update(req.body); // ใช้ req.body เป็นข้อมูลใหม่

    // ส่งข้อมูลที่อัปเดตกลับ
    res.status(200).json({
      success: true,
      data: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get Delete
exports.deleteJob = async (req, res) => {
  try {
    // ดึง ID จาก URL
    const jobId = req.params.id;

    // ค้นหา Job ที่ต้องการลบ
    const job = await Job.findByPk(jobId);

    // ตรวจสอบว่าพบข้อมูลหรือไม่
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // ลบข้อมูล
    await job.destroy();

    // ส่งข้อความยืนยันการลบ
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
