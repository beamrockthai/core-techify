import React, { useState, useEffect } from "react";
import UploadBoxFrom from "../components/UploadBoxFrom";
import InputFrom from "../components/InputFrom";
import { registerJob } from "../api/registerJob";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../api/jobApi";
import Swal from "sweetalert2"; // ✅ ใช้ SweetAlert2 สำหรับ Popup

function RegisterFromPage() {
  console.log("✅ RegisterFromPage rendering...");
  const [jobTitle, setJobTitle] = useState("");

  const { jobId } = useParams();
  const navigate = useNavigate();

  // ✅ ตรวจสอบว่า jobId เป็น UUID จริง
  if (!jobId || !/^[0-9a-fA-F-]{36}$/.test(jobId)) {
    Swal.fire("เกิดข้อผิดพลาด", "jobId ไม่ถูกต้อง หรือไม่ได้รับค่า", "error");
    return;
  }

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const jobData = await getJobById(jobId);
        console.log("✅ ได้รับข้อมูลตำแหน่งงาน:", jobData);

        if (jobData) {
          setJobTitle(jobData.JobName); // ✅ ใช้ค่า `JobName`
          console.log("📌 ตั้งค่า jobTitle:", jobData.JobName);
        } else {
          setJobTitle("ไม่พบข้อมูลตำแหน่งงาน");
        }
      } catch (error) {
        console.error("❌ Error fetching job:", error);
        setJobTitle("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      }
    };

    if (jobId) fetchJobData();
  }, [jobId]);

  // ✅ State สำหรับข้อมูลส่วนบุคคล
  const [personalData, setPersonalData] = useState({});
  const handleInputChange = (newData) => {
    console.log("📌 กำลังอัปเดตข้อมูลจาก InputForm:", newData);
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
    console.log("📌 FormData ที่จะส่งไป Backend:", personalData);

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
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-white via-purple-200 to-white ">
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-xl font-bold text-purple-700">
          ตำแหน่งที่ท่านต้องการสมัคร
        </h2>
        <h1 className="text-3xl font-bold text-black my-2 mb-10">
          {jobTitle || "กำลังโหลด..."}
        </h1>

        <h2 className="text-xl font-bold text-gray-800 mb-5">
          หลักฐานประกอบการสมัคร
        </h2>

        <div className="max-w-3xl ml-0 space-y-5 pl-5">
          <UploadBoxFrom
            label="๑. รูปถ่ายขนาด ๑ นิ้ว"
            onFileSelect={setProfileImage}
          />
          <UploadBoxFrom
            label="๒. สำเนาบัตรประจำตัวประชาชน จำนวน ๑ ฉบับ"
            onFileSelect={setIdCardImage}
          />
          <UploadBoxFrom
            label="๓. สำเนาสำเนาทะเบียนบ้าน จำนวน ๑ ฉบับ"
            onFileSelect={setHouseRegistrationImage}
          />
          <UploadBoxFrom
            label="๔. สำเนาวุฒิการศึกษาหรือหนังสือรับรองหรือระเบียนแสดงการเรียนจำนวน ๑ ชุดภาษาไทย"
            onFileSelect={setDegreeCertificateImage}
          />
          <UploadBoxFrom
            label="๕. Transcript"
            onFileSelect={setTranscriptImage}
          />
          <UploadBoxFrom
            label="๖. สำเนาเอกสารที่แสดงว่าเป็นผู้ผ่านเกณฑ์ทหาร (กรณีเพศชาย)ได้แก่หนังสือสำคัญแบบ สด.๘  หรือใบสำคัญ แบบ สด.๙ หรือใบรับรองผ่านการตรวจเลือกทหารกองเกินเข้ารับราชการทหาร
กองประจำการ จำนวน ๑ ฉบับ"
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

        <hr className="border-t-100 border-gray-300 my-20" />

        <h1 className="text-3xl font-bold text-black my-2 mb-0">
          กรุณากรอกข้อมูลส่วนตัว
        </h1>

        <div className="mb-3">
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
