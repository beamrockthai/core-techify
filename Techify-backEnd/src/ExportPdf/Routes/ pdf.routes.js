const express = require("express");
const router = express.Router();
const generatePDF = require("../Controller/generatePDF");

// 📌 API สำหรับสร้างและดาวน์โหลด PDF
router.post("/generate-pdf", async (req, res) => {
  try {
    const data = req.body.data[0]; // ดึงข้อมูลผู้สมัคร
    const pdfPath = await generatePDF(data);
    res.download(pdfPath);
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาด:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการสร้าง PDF");
  }
});

module.exports = router;
