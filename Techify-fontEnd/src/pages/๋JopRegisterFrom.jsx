import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ✅ ใช้ navigate
import UploadBoxFrom from "../components/UploadBoxFrom";
import InputFrom from "../components/InputFrom";
import { registerJob } from "../api/registerJob"; // ✅ นำเข้า API
// import { getJobById } from "../api/jobApi";

function RegisterFromPage() {
  console.log("✅ RegisterFromPage rendering...");
  const navigate = useNavigate();
  const { jobId } = useParams();

  // ✅ ตรวจสอบว่า jobId เป็น UUID จริง
  if (!jobId || !/^[0-9a-fA-F-]{36}$/.test(jobId)) {
    alert("❌ jobId ไม่ถูกต้อง หรือไม่ได้รับค่า");
    return;
  }

  // ✅ State สำหรับข้อมูลส่วนตัวจาก InputFrom
  const [personalData, setPersonalData] = useState({});
  const handleInputChange = (newData) => {
    setPersonalData((prevData) => ({ ...prevData, ...newData }));
  };

  // ✅ State สำหรับไฟล์อัปโหลด
  const [uploadedFiles, setUploadedFiles] = useState({
    profileImage: null,
    idCardImage: null,
    houseRegistrationImage: null,
    degreeCertificateImage: null,
    transcriptImage: null,
    workCertificateImage: null,
    medicalCertificateImage: null,
    criminalRecordImage: null,
    passportImage: null,
    drivingLicenseImage: null,
    attachedFiles: [],
  });

  // ✅ ฟังก์ชันจัดการไฟล์อัปโหลด
  const handleFileSelect = (field, file) => {
    setUploadedFiles((prev) => ({ ...prev, [field]: file }));
  };

  // ✅ ฟังก์ชันตรวจสอบข้อมูลที่จำเป็น
  const validateForm = () => {
    return (
      personalData.firstName &&
      personalData.lastName &&
      uploadedFiles.profileImage
    );
  };

  // ✅ ฟังก์ชันส่งฟอร์มไปยัง API
  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("❌ กรุณากรอกข้อมูลให้ครบและอัปโหลดรูปถ่ายขนาด 1 นิ้ว");
      return;
    }

    // ✅ Popup ยืนยันก่อนส่ง
    const isConfirmed = window.confirm(
      "📩 คุณต้องการยืนยันการสมัครงานหรือไม่?"
    );
    if (!isConfirmed) return;

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("personalInfo", JSON.stringify(personalData));

    // ✅ เพิ่มไฟล์เข้า FormData
    Object.entries(uploadedFiles).forEach(([key, file]) => {
      if (file?.file) formData.append(key, file.file);
    });

    try {
      const response = await registerJob(formData);
      console.log("✅ สมัครงานสำเร็จ:", response);

      if (response.success) {
        alert("🎉 สมัครงานสำเร็จ! กำลังไปยังหน้าประวัติการสมัครงาน...");

        setIsLoggedIn(true); // ✅ บังคับให้อัปเดต Token เป็น Logged In
        navigate("/job-history");
      } else {
        alert("❌ เกิดข้อผิดพลาด: " + response.message);
      }
    } catch (error) {
      console.error("❌ สมัครงานล้มเหลว:", error);
      alert("❌ อัปโหลดไฟล์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-yellow-50 to-yellow-200">
      <div className="container mx-auto p-4 flex-grow">
        {/* ✅ อัปโหลดเอกสาร */}
        <div className="flex flex-col space-y-4 max-w-lg mx-auto">
          {[
            { label: "๑. รูปถ่ายขนาด ๑ นิ้ว", key: "profileImage" },
            { label: "๒. สำเนาบัตรประชาชน", key: "idCardImage" },
            { label: "๓. สำเนาทะเบียนบ้าน", key: "houseRegistrationImage" },
            { label: "๔. สำเนาวุฒิการศึกษา", key: "degreeCertificateImage" },
            { label: "๕. ใบ Transcript", key: "transcriptImage" },
            { label: "๖. ใบรับรองการทำงาน", key: "workCertificateImage" },
            { label: "๗. ใบรับรองแพทย์", key: "medicalCertificateImage" },
            { label: "๘. ประวัติอาชญากรรม", key: "criminalRecordImage" },
            { label: "๙. Passport", key: "passportImage" },
            { label: "๑๐. ใบขับขี่", key: "drivingLicenseImage" },
          ].map(({ label, key }) => (
            <UploadBoxFrom
              key={key}
              label={label}
              onFileSelect={(file) => handleFileSelect(key, file)}
            />
          ))}
        </div>

        {/* 🔹 เส้นขีดคั่น 🔹 */}
        <hr className="border-t-2 border-gray-300 my-8" />

        {/* ✅ แบบฟอร์มข้อมูลส่วนตัว */}
        <div className="mb-6">
          <InputFrom onInputChange={handleInputChange} />
        </div>

        {/* ✅ ปุ่มสมัครงาน */}
        <div className="mt-12 flex justify-center">
          <button
            className={`py-2 px-6 rounded-lg shadow-md text-lg ${
              validateForm() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
            } text-white`}
            onClick={handleSubmit}
            disabled={!validateForm()}
          >
            📩 สมัครงาน
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterFromPage;
