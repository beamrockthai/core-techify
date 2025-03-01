import jsPDF from "jspdf";
import NotoSansThai from "../fonts/NotoSansThai"; // ✅ ฟอนต์ภาษาไทย
const BASE_URL = "http://localhost:3000/"; // ✅ ตั้งค่า BASE_URL สำหรับรูป

// ✅ ฟังก์ชันโหลดรูปภาพจาก URL เป็น Base64
const loadImageAsBase64 = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error("❌ Error loading image:", imageUrl);
      return null;
    }
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("❌ Error loading image:", imageUrl, error);
    return null;
  }
};

// ✅ ฟังก์ชันตรวจสอบพื้นที่หน้า PDF และเพิ่มหน้าใหม่ถ้าจำเป็น
const checkPageBreak = (doc, currentY, margin = 10) => {
  if (currentY > 270) {
    doc.addPage();
    return 20 + margin;
  }
  return currentY;
};

// ✅ ฟังก์ชันสร้าง PDF
export const generatePDF = async (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("❌ No data to generate PDF");
    return;
  }

  const doc = new jsPDF("p", "mm", "a4");

  // ✅ เพิ่มฟอนต์ภาษาไทย
  doc.addFileToVFS("NotoSansThai.ttf", NotoSansThai);
  doc.addFont("NotoSansThai.ttf", "NotoSansThai", "normal");
  doc.setFont("NotoSansThai");

  for (let index = 0; index < data.length; index++) {
    const job = data[index];
    const user = job.User || {}; // ✅ ดึงข้อมูลผู้ใช้
    const jobInfo = job.Job || {}; // ✅ ดึงข้อมูลตำแหน่งงาน
    let startY = 20;

    if (index !== 0) {
      doc.addPage();
    }

    // ✅ หัวเอกสาร
    doc.setFontSize(18);
    doc.setTextColor(0, 51, 102);
    doc.text("📄 ใบสมัครงานราชการ", 70, startY);
    startY += 10;

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(
      `📅 วันที่ออกเอกสาร: ${new Date().toLocaleDateString()}`,
      14,
      startY
    );
    startY += 10;

    // ✅ โหลดรูปโปรไฟล์
    if (job.profileImage) {
      const profileBase64 = await loadImageAsBase64(
        `${BASE_URL}${job.profileImage}`
      );
      if (profileBase64) {
        doc.addImage(profileBase64, "JPEG", 160, startY, 30, 30);
      }
    }
    startY += 10;

    // ✅ ข้อมูลตำแหน่งงานที่สมัคร
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text("📌 ข้อมูลตำแหน่งที่สมัคร", 14, startY);
    startY += 8;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`🔹 ตำแหน่งที่สมัคร: ${jobInfo.JobName || "ไม่ระบุ"}`, 20, startY);
    startY = checkPageBreak(doc, startY + 7);
    doc.text(`🔹 สถานที่ทำงาน: ${jobInfo.Location || "ไม่ระบุ"}`, 20, startY);
    startY = checkPageBreak(doc, startY + 7);
    doc.text(
      `🔹 รายละเอียดงาน: ${jobInfo.Description || "ไม่มีข้อมูล"}`,
      20,
      startY
    );
    startY = checkPageBreak(doc, startY + 10);

    doc.line(14, startY, 190, startY);
    startY += 10;

    // ✅ ข้อมูลผู้สมัคร
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text("👤 ข้อมูลผู้สมัคร", 14, startY);
    startY = checkPageBreak(doc, startY + 8);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(
      `🔹 ชื่อ-นามสกุล: ${user.firstName || "ไม่ระบุ"} ${user.lastName || ""}`,
      20,
      startY
    );
    startY = checkPageBreak(doc, startY + 7);
    doc.text(`🔹 เลขบัตรประชาชน: ${user.nationalId || "ไม่ระบุ"}`, 20, startY);
    startY = checkPageBreak(doc, startY + 7);
    doc.text(`🔹 วันเกิด: ${user.birhDate || "ไม่ระบุ"}`, 20, startY);
    startY = checkPageBreak(doc, startY + 7);
    doc.text(`🔹 อีเมล: ${user.email || "ไม่ระบุ"}`, 20, startY);
    startY = checkPageBreak(doc, startY + 7);
    doc.text(`🔹 เบอร์โทร: ${user.phoneNumber || "ไม่ระบุ"}`, 20, startY);
    startY = checkPageBreak(doc, startY + 10);

    doc.line(14, startY, 190, startY);
    startY += 10;

    // ✅ ข้อมูลส่วนตัว
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text("📋 ข้อมูลส่วนตัวเพิ่มเติม", 14, startY);
    startY += 8;
    const personalInfo = job.personalInfo || {};
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`🔹 เพศ: ${personalInfo.gender || "ไม่ระบุ"}`, 20, startY);
    startY = checkPageBreak(doc, startY + 7);
    doc.text(
      `🔹 กรุ๊ปเลือด: ${personalInfo.bloodType || "ไม่ระบุ"}`,
      20,
      startY
    );
    startY = checkPageBreak(doc, startY + 7);
    doc.text(`🔹 ส่วนสูง: ${personalInfo.height || "ไม่ระบุ"}`, 20, startY);
    startY = checkPageBreak(doc, startY + 7);
    doc.text(`🔹 น้ำหนัก: ${personalInfo.weight || "ไม่ระบุ"}`, 20, startY);
    startY = checkPageBreak(doc, startY + 10);

    doc.line(14, startY, 190, startY);
    startY += 10;

    // ✅ ประวัติการทำงาน
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text("💼 ประวัติการทำงาน", 14, startY);
    startY += 8;
    const workHistory = job.workHistory || [];
    workHistory.forEach((work, i) => {
      doc.text(
        `📌 บริษัท: ${work.companyName || "ไม่ระบุ"} - ตำแหน่ง: ${
          work.position || "ไม่ระบุ"
        }`,
        20,
        startY
      );
      startY = checkPageBreak(doc, startY + 7);
    });

    doc.line(14, startY, 190, startY);
    startY += 10;

    // ✅ ทักษะพิเศษ
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text("🎯 ทักษะพิเศษ", 14, startY);
    startY += 8;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`🔹 ทักษะ: ${job.specialSkills || "ไม่ระบุ"}`, 20, startY);
    startY = checkPageBreak(doc, startY + 10);

    doc.line(14, startY, 190, startY);
    startY += 10;

    // ✅ แสดงเอกสารแนบ
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text("📄 เอกสารแนบ", 14, startY);
    startY = checkPageBreak(doc, startY + 10);

    const documents = [
      { label: "📌 บัตรประชาชน", key: job.idCardImage },
      { label: "📌 ทะเบียนบ้าน", key: job.houseRegistrationImage },
      { label: "📌 ประกาศนียบัตร", key: job.degreeCertificateImage },
      { label: "📌 Transcript", key: job.transcriptImage },
      { label: "📌 ใบรับรองการทำงาน", key: job.workCertificateImage },
      { label: "📌 ใบรับรองแพทย์", key: job.medicalCertificateImage },
      { label: "📌 ใบประวัติอาชญากรรม", key: job.criminalRecordImage },
      { label: "📌 Passport", key: job.passportImage },
      { label: "📌 ใบขับขี่", key: job.drivingLicenseImage },
    ];

    let imageX = 20;
    let imageY = startY;
    for (const docItem of documents) {
      if (docItem.key) {
        doc.text(docItem.label, 20, imageY);
        const base64 = await loadImageAsBase64(`${BASE_URL}${docItem.key}`);
        if (base64) {
          doc.addImage(base64, "JPEG", imageX + 80, imageY - 5, 40, 30);
          imageY = checkPageBreak(doc, imageY + 35);
        }
      } else {
        doc.text(`${docItem.label}: ไม่ระบุ`, 20, imageY);
        imageY = checkPageBreak(doc, imageY + 7);
      }
    }
  }

  // ✅ ดาวน์โหลดไฟล์ PDF
  doc.save("ใบสมัครงาน.pdf");
};
