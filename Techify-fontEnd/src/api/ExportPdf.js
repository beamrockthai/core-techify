import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/pdf"; // URL ของ Backend

export const downloadPDF = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/generate-pdf`,
      { data: [userData] }, // ส่งข้อมูลผู้ใช้ไปยัง backend
      { responseType: "blob" } // รับเป็นไฟล์ PDF
    );

    // สร้างลิงก์ดาวน์โหลด
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("❌ ไม่สามารถดาวน์โหลด PDF ได้", error);
  }
};
