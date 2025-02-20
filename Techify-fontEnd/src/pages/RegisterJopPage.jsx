import React, { useState, useEffect } from "react";
import { getJobs } from "../api/jobApi";

const RegisterJob = () => {
  const [tableData, setTableData] = useState(null); // ✅ ป้องกัน undefined
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        console.log("📌 API Response:", response); // ✅ Debug API Response

        if (Array.isArray(response)) {
          setTableData(response); // ✅ ใช้ response ตรงๆ ถ้าเป็น Array
        } else if (response?.data && Array.isArray(response.data)) {
          setTableData(response.data); // ✅ ใช้ response.data ถ้ามี
        } else {
          setTableData([]); // ❌ ถ้ารูปแบบผิดให้เป็น []
        }
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
        setError(error.message);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
          รายการตำแหน่งงาน
        </h1>

        {error ? (
          <p className="text-red-500 text-center text-lg">{error}</p>
        ) : tableData === null ? (
          <p className="text-gray-500 text-center text-lg">
            กำลังโหลดข้อมูล...
          </p>
        ) : tableData.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">ไม่พบข้อมูล</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tableData.map((job, index) => {
              const isClosed = !job.IsActive;

              return (
                <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {job.JobName}
                  </h2>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">ที่อยู่:</span> {job.Location}
                  </p>
                  <p className="text-gray-600 mb-3">
                    <span className="font-medium">รายละเอียด:</span>{" "}
                    {job.Description}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      isClosed
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {isClosed ? "ปิดรับสมัคร" : "เปิดรับสมัคร"}
                  </span>
                  <button
                    className={`w-full mt-4 py-2 text-lg font-semibold rounded-md transition-all ${
                      isClosed
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                    disabled={isClosed}
                  >
                    {isClosed ? "ปิดรับสมัคร" : "สมัครงาน"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterJob;
