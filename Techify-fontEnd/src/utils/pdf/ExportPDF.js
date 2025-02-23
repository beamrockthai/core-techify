import jsPDF from "jspdf";
import NotoSansThai from "../fonts/NotoSansThai"; // ✅ นำเข้าไฟล์ฟอนต์ภาษาไทย

// ✅ ฟังก์ชันโหลดรูปภาพจาก URL แล้วแปลงเป็น Base64
const loadImageAsBase64 = async (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg"));
    };
    img.onerror = (err) => {
      console.error("❌ Error loading image:", err);
      reject(err);
    };
    img.src = url;
  });
};

// ✅ ฟังก์ชันสร้าง PDF (ออกแบบให้เหมือนแบบฟอร์มสมัครงาน)
export const generatePDF = async (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("❌ No data to generate PDF");
    return;
  }

  const doc = new jsPDF("p", "mm", "a4"); // ✅ ตั้งค่าหน้ากระดาษ A4

  // ✅ เพิ่มฟอนต์ภาษาไทย
  doc.addFileToVFS("NotoSansThai.ttf", NotoSansThai);
  doc.addFont("NotoSansThai.ttf", "NotoSansThai", "normal");
  doc.setFont("NotoSansThai");

  for (let index = 0; index < data.length; index++) {
    const job = data[index];

    if (index !== 0) {
      doc.addPage();
    }

    // ✅ หัวเอกสาร
    doc.setFontSize(18);
    doc.setTextColor(0, 51, 102);
    doc.text("📝 ใบสมัครงาน", 80, 15);

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`📅 วันที่ออกเอกสาร: ${new Date().toLocaleDateString()}`, 14, 25);

    let startY = 35;

    // ✅ เพิ่มรูปโปรไฟล์ (ถ้ามี)
    if (job.profileImage) {
      try {
        const profileBase64 = await loadImageAsBase64(job.profileImage);
        doc.addImage(profileBase64, "JPEG", 160, startY, 30, 30);
      } catch (error) {
        console.error("❌ Error loading profile image:", error);
      }
    }

    startY += 10;

    // ✅ ตำแหน่งงานที่สมัคร
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(
      `📌 ตำแหน่งที่สมัคร: ${job.Job?.JobName || "ไม่ระบุ"}`,
      14,
      startY
    );
    startY += 8;
    doc.text(`📍 สถานที่ทำงาน: ${job.Job?.Location || "ไม่ระบุ"}`, 14, startY);
    startY += 8;
    doc.text(
      `📜 รายละเอียดงาน: ${job.Job?.Description || "ไม่มีข้อมูล"}`,
      14,
      startY
    );
    startY += 12;

    doc.line(14, startY, 190, startY);
    startY += 10;

    // ✅ ข้อมูลส่วนตัว
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text("👤 ข้อมูลส่วนตัว", 14, startY);
    startY += 8;

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`📝 ชื่อ: ${job.personalInfo.fullName || "ไม่ระบุ"}`, 20, startY);
    startY += 7;
    doc.text(
      `📧 อีเมล: ${job.personalInfo.contact?.email || "ไม่ระบุ"}`,
      20,
      startY
    );
    startY += 7;
    doc.text(
      `📞 เบอร์โทร: ${job.personalInfo.contact?.phone || "ไม่ระบุ"}`,
      20,
      startY
    );
    startY += 7;
    doc.text(
      `🏠 ที่อยู่: ${job.personalInfo.address || "ไม่ระบุ"}`,
      20,
      startY
    );
    startY += 10;

    doc.line(14, startY, 190, startY);
    startY += 10;

    // ✅ ประวัติการศึกษา
    if (job.educationHistory?.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(0, 51, 102);
      doc.text("🎓 ประวัติการศึกษา", 14, startY);
      startY += 8;

      doc.setFontSize(12);
      doc.setTextColor(0);
      job.educationHistory.forEach((edu, i) => {
        doc.text(
          `📌 ${edu.degree} - ${edu.university} (${edu.year})`,
          20,
          startY + i * 7
        );
      });

      startY += job.educationHistory.length * 7 + 10;
    }

    doc.line(14, startY, 190, startY);
    startY += 10;

    // ✅ ประวัติการทำงาน
    if (job.workHistory?.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(0, 51, 102);
      doc.text("💼 ประวัติการทำงาน", 14, startY);
      startY += 8;

      doc.setFontSize(12);
      doc.setTextColor(0);
      job.workHistory.forEach((work, i) => {
        doc.text(
          `📌 ${work.position} - ${work.company} (${work.duration})`,
          20,
          startY + i * 7
        );
      });

      startY += job.workHistory.length * 7 + 10;
    }

    doc.line(14, startY, 190, startY);
    startY += 10;

    // ✅ ความสามารถพิเศษ
    if (job.specialSkills) {
      doc.setFontSize(14);
      doc.setTextColor(0, 51, 102);
      doc.text("🌟 ความสามารถพิเศษ", 14, startY);
      startY += 8;

      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(job.specialSkills, 20, startY);
      startY += 10;
    }

    doc.line(14, startY, 190, startY);
    startY += 10;

    // ✅ เอกสารแนบ (Citizen ID และ Resume)
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text("📄 เอกสารแนบ", 14, startY);
    startY += 10;

    if (job.attachedFiles) {
      if (job.attachedFiles.citizen_id) {
        try {
          const citizenBase64 = await loadImageAsBase64(
            job.attachedFiles.citizen_id
          );
          doc.addImage(citizenBase64, "JPEG", 20, startY, 50, 30);
        } catch (error) {
          console.error("❌ Error loading citizen ID:", error);
        }
      }
      if (job.attachedFiles.resume) {
        try {
          const resumeBase64 = await loadImageAsBase64(
            job.attachedFiles.resume
          );
          doc.addImage(resumeBase64, "JPEG", 80, startY, 50, 30);
        } catch (error) {
          console.error("❌ Error loading resume:", error);
        }
      }
    }
  }

  // ✅ ดาวน์โหลดไฟล์ PDF
  doc.save("ใบสมัครงาน.pdf");
};
