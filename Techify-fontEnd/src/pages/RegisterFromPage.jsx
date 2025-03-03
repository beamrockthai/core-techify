import React, { useState } from "react";
import UploadBoxFrom from "../components/UploadBoxFrom";
import InputFrom from "../components/InputFrom";
import { registerJob } from "../api/registerJob";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ ใช้ SweetAlert2 สำหรับ Popup

function RegisterFromPage() {
  console.log("✅ RegisterFromPage rendering...");
  const { jobId } = useParams();
  const navigate = useNavigate();

  // ✅ ตรวจสอบว่า jobId เป็น UUID จริง
  if (!jobId || !/^[0-9a-fA-F-]{36}$/.test(jobId)) {
    Swal.fire("เกิดข้อผิดพลาด", "jobId ไม่ถูกต้อง หรือไม่ได้รับค่า", "error");
    return;
  }

  // ✅ State สำหรับข้อมูลส่วนบุคคล
  const [personalData, setPersonalData] = useState({});
  const handleInputChange = (newData) => {
    setPersonalData((prevData) => ({ ...prevData, ...newData }));
  };

  // ✅ State สำหรับไฟล์อัปโหลด
  const [profileImage, setProfileImage] = useState(null);
  const [idCardImage, setIdCardImage] = useState(null);
  const [houseRegistrationImage, setHouseRegistrationImage] = useState(null);
  const [degreeCertificateImage, setDegreeCertificateImage] = useState(null);
  const [transcriptImage, setTranscriptImage] = useState(null);
  const [workCertificateImage, setWorkCertificateImage] = useState(null);
  const [medicalCertificateImage, setMedicalCertificateImage] = useState(null);
  const [criminalRecordImage, setCriminalRecordImage] = useState(null);
  const [passportImage, setPassportImage] = useState(null);
  const [drivingLicenseImage, setDrivingLicenseImage] = useState(null);
  const [attachedFiles, setAttachedFiles] = useState([]);

  // ✅ ฟังก์ชันส่งฟอร์มไปยัง API พร้อม Popup แจ้งเตือน
  const handleSubmit = async () => {
    // ✅ แสดง Popup ยืนยันก่อนสมัคร
    const confirmResult = await Swal.fire({
      title: "ยืนยันการสมัคร?",
      text: "กรุณาตรวจสอบข้อมูลของคุณก่อนกดสมัคร",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "✅ สมัครเลย!",
      cancelButtonText: "❌ ยกเลิก",
    });

    if (!confirmResult.isConfirmed) return; // ถ้าผู้ใช้กดยกเลิก

    // ✅ เริ่มสร้าง FormData เพื่อส่งไปยัง Backend
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("personalInfo", JSON.stringify(personalData));

    // ✅ ฟังก์ชันช่วยเพิ่มไฟล์เข้า FormData
    const addFileToFormData = (fieldName, fileData) => {
      if (fileData?.file) {
        formData.append(fieldName, fileData.file);
      }
    };

    addFileToFormData("profileImage", profileImage);
    addFileToFormData("idCardImage", idCardImage);
    addFileToFormData("houseRegistrationImage", houseRegistrationImage);
    addFileToFormData("degreeCertificateImage", degreeCertificateImage);
    addFileToFormData("transcriptImage", transcriptImage);
    addFileToFormData("workCertificateImage", workCertificateImage);
    addFileToFormData("medicalCertificateImage", medicalCertificateImage);
    addFileToFormData("criminalRecordImage", criminalRecordImage);
    addFileToFormData("passportImage", passportImage);
    addFileToFormData("drivingLicenseImage", drivingLicenseImage);

    attachedFiles.forEach((fileObj) => {
      if (fileObj?.file) {
        formData.append("attachedFiles", fileObj.file);
      }
    });

    try {
      const response = await registerJob(formData);
      console.log("✅ Upload Success:", response);

      if (response.success) {
        // ✅ สมัครงานสำเร็จ -> แสดง Popup & ไปหน้า job-history
        Swal.fire({
          title: "✅ สมัครงานสำเร็จ!",
          text: "คุณสมัครงานสำเร็จแล้ว กรุณาตรวจสอบสถานะการสมัครของคุณ",
          icon: "success",
          confirmButtonText: "ไปยังหน้าประวัติการสมัคร",
        }).then(() => {
          navigate("/job-history");
        });
      } else {
        Swal.fire(
          "เกิดข้อผิดพลาด",
          response.message || "สมัครงานไม่สำเร็จ",
          "error"
        );
      }
    } catch (error) {
      console.error("❌ Upload Failed:", error);
      Swal.fire("❌ อัปโหลดล้มเหลว", "กรุณาลองใหม่อีกครั้ง", "error");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-yellow-50 to-yellow-200">
      <div className="container mx-auto p-4 flex-grow">
        <div className="flex flex-col space-y-4 max-w-lg mx-auto">
          <UploadBoxFrom
            label="๑. รูปถ่ายขนาด ๑ นิ้ว"
            onFileSelect={setProfileImage}
          />
          <UploadBoxFrom
            label="๒. สำเนาบัตรประชาชน"
            onFileSelect={setIdCardImage}
          />
          <UploadBoxFrom
            label="๓. สำเนาทะเบียนบ้าน"
            onFileSelect={setHouseRegistrationImage}
          />
          <UploadBoxFrom
            label="๔. สำเนาวุฒิการศึกษา"
            onFileSelect={setDegreeCertificateImage}
          />
          <UploadBoxFrom
            label="๕. ใบ Transcript"
            onFileSelect={setTranscriptImage}
          />
          <UploadBoxFrom
            label="๖. ใบรับรองการทำงาน"
            onFileSelect={setWorkCertificateImage}
          />
          <UploadBoxFrom
            label="๗. ใบรับรองแพทย์"
            onFileSelect={setMedicalCertificateImage}
          />
          <UploadBoxFrom
            label="๘. ประวัติอาชญากรรม"
            onFileSelect={setCriminalRecordImage}
          />
          <UploadBoxFrom label="๙. Passport" onFileSelect={setPassportImage} />
          <UploadBoxFrom
            label="๑๐. ใบขับขี่"
            onFileSelect={setDrivingLicenseImage}
          />
          <UploadBoxFrom
            label="๑๑. ไฟล์แนบอื่น ๆ (สูงสุด 10 ไฟล์)"
            onFileSelect={(file) => setAttachedFiles([...attachedFiles, file])}
          />
        </div>

        <hr className="border-t-2 border-gray-300 my-8" />

        <div className="mb-6">
          <InputFrom onInputChange={handleInputChange} />
        </div>

        <div className="mt-12 flex justify-center">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition text-lg"
            onClick={handleSubmit}
          >
            สมัครงาน
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterFromPage;
