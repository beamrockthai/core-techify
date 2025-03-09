import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import { getJobById } from "../api/jobApi";

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
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
    return (
      <div className="text-center text-gray-500">
        ⏳ กำลังโหลดข้อมูลตำแหน่งงาน...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // ✅ Fade-in ทั้งหน้า
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[40%_60%] gap-6 md:gap-10">
        {/* ✅ ส่วนซ้าย (40%) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }} // ✅ Slide-in จากซ้าย
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-b from-white to-purple-100 p-6 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl font-bold text-black">{job.JobName}</h1>

          <p className="text-gray-600 mt-2 flex items-center">
            📍 <strong className="ml-1">ที่ตั้ง</strong> {job.Location}
          </p>

          {/* ✅ ปุ่มสมัครงาน & ย้อนกลับ */}
          <div className="flex flex-col gap-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }} // ✅ Hover effect
              className="btn btn-outline btn-primary w-full"
              onClick={() => navigate(`/ifpage/${jobId}`)}
            >
              สมัครงาน
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="btn btn-outline btn-secondary w-full"
              onClick={() => navigate(-1)}
            >
              🔙 ย้อนกลับ
            </motion.button>
          </div>
        </motion.div>

        {/* ✅ ส่วนขวา (60%) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }} // ✅ Slide-in จากขวา
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-b from-white to-purple-100 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-bold text-purple-700">รายละเอียดงาน</h2>

          <div className="mt-4">
            <h3 className="text-md font-bold text-purple-700">
              หน้าที่ความรับผิดชอบ
            </h3>
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
              <h3 className="text-md font-bold text-purple-700">
                ระยะเวลาการจ้าง
              </h3>
              <p className="text-gray-700 mt-2">{job.Period}</p>
            </div>
          )}

          {job.Ror && (
            <div className="mt-4">
              <h3 className="text-md font-bold text-purple-700">อัตราตอบแทน</h3>
              <p className="text-gray-700 mt-2">{job.Ror}</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JobDetail;
