import React, { useState, useEffect } from "react";
import { getJobs } from "../api/jobApi";
import Banner from "../components/Banner";

const RegisterJob = () => {
  const [tableData, setTableData] = useState(null); // ป้องกัน undefined
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        console.log("📌 API Response:", response); // Debug API Response

        if (Array.isArray(response)) {
          setTableData(response); // ใช้ response ตรงๆ ถ้าเป็น Array
        } else if (response?.data && Array.isArray(response.data)) {
          setTableData(response.data); // ใช้ response.data ถ้ามี
        } else {
          setTableData([]); // ถ้ารูปแบบผิดให้เป็น []
        }
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
        setError(error.message);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 flex flex-col">
      <div className="container mx-auto">
        {error ? (
          <p className="text-red-500 text-center text-lg">{error}</p>
        ) : tableData === null ? (
          <p className="text-gray-500 text-center text-lg">
            กำลังโหลดข้อมูล...
          </p>
        ) : tableData.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">ไม่พบข้อมูล</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">ชื่องาน</th>
                  <th className="px-4 py-2">รายละเอียด</th>
                  <th className="px-4 py-2">ที่อยู่</th>
                  <th className="px-4 py-2">สถานะ</th>
                  <th className="px-4 py-2">สมัครงาน</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((job, index) => {
                  const isClosed = !job.IsActive;

                  return (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 font-semibold">{job.JobName}</td>
                      <td className="px-4 py-2">{job.Description}</td>
                      <td className="px-4 py-2">{job.Location}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            isClosed
                              ? "bg-red-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {isClosed ? "ปิดรับสมัคร" : "เปิดรับสมัคร"}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className={`w-full px-6 py-2 font-semibold text-white rounded-lg transition-all transform shadow-lg ${
                            isClosed
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 hover:shadow-xl"
                          }`}
                          disabled={isClosed}
                        >
                          {isClosed ? "ปิดรับสมัคร" : "สมัครงาน"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Banner อยู่ล่างสุดและ Responsive
      <div className="mt-12 w-full px-15 left-0 bottom-0">
        <Banner />
      </div> */}
    </div>
  );
};

export default RegisterJob;
