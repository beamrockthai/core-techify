import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ เพิ่ม useNavigate
import { getJobById } from "../api/jobApi"; 


const JobDetail = () => {
  const { jobId } = useParams(); // ✅ ใช้ jobId ตาม Route
  const navigate = useNavigate(); // ✅ ใช้ navigate() เพื่อนำทาง
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("📡 useParams jobId:", jobId);

    if (!jobId) {
      console.error("❌ ไม่มี jobId จาก useParams()");
      setError("ไม่พบตำแหน่งงานที่เลือก");
      return;
    }

    const fetchJob = async () => {
      try {
        console.log("🔍 Fetching job ID:", jobId);
        const jobData = await getJobById(jobId);
        console.log("✅ Job Data:", jobData);

        if (!jobData) {
          throw new Error("❌ ไม่พบข้อมูลงาน");
        }

        setJob(jobData);
      } catch (err) {
        console.error("❌ Error fetching job:", err);
        setError("เกิดข้อผิดพลาด หรือไม่พบตำแหน่งงานที่เลือก");
      }
    };

    fetchJob();
  }, [jobId]);

  if (error) {
    return <div className="text-center text-red-500">❌ {error}</div>;
  }

  if (!job) {
    return <div className="text-center text-gray-500">⏳ กำลังโหลดข้อมูลตำแหน่งงาน...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gradient-to-b from-white to-purple-100 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-black">{job.JobName}</h1>
          
          <p className="text-gray-600 mt-2 flex items-center">
            📍 <strong className="ml-1">ที่ตั้ง</strong> {job.Location}
          </p>
          
          {/* ✅ ปุ่มสมัครงาน นำทางไป /ifpage/:jobId */}
          <button
            className="btn btn-outline btn-primary mt-4 w-full"
            onClick={() => navigate(`/ifpage/${jobId}`)}
          >
            สมัครงาน
          </button>

          {/* ✅ ปุ่มย้อนกลับ กลับไปหน้าก่อน หรือไป /jobs */}
          <button
            className="btn btn-outline btn-secondary mt-4 w-full"
            onClick={() => navigate(-1)} // ✅ กลับไปหน้าก่อนหน้า
          >
            🔙 ย้อนกลับ
          </button>
        </div>

        <div className="bg-gradient-to-b from-white to-purple-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-purple-700">รายละเอียดงาน</h2>

          <div className="mt-4">
            <h3 className="text-md font-bold text-purple-700">หน้าที่ความรับผิดชอบ</h3>
            <p className="text-gray-700 mt-2">{job.Description}</p>
          </div>

          {job.Respon && (
            <div className="mt-4">
              <h3 className="text-md font-bold text-purple-700">คุณสมบัติ</h3>
              <p className="text-gray-700 mt-2">{job.Respon}</p>
            </div>
          )}

          {job.Period && (
            <div className="mt-4">
              <h3 className="text-md font-bold text-purple-700">ระยะเวลาการจ้าง</h3>
              <p className="text-gray-700 mt-2">{job.Period}</p>
            </div>
          )}

          {job.Ror && (
            <div className="mt-4">
              <h3 className="text-md font-bold text-purple-700">อัตราตอบแทน</h3>
              <p className="text-gray-700 mt-2">{job.Ror}</p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default JobDetail;
