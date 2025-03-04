import React, { useState, useEffect } from "react";
import { getJobs } from "../api/jobApi";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
// import Banner from "../components/Banner";

const RegisterJob = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(true);

  const navigate = useNavigate(); // ✅ สำหรับเปลี่ยนหน้า

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        console.log("📌 API Response:", response);

        const jobs = Array.isArray(response) ? response : response?.data || [];
        setTableData(jobs);
        setFilteredData(jobs); // เริ่มต้นให้ตรงกับข้อมูลทั้งหมด
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
        setError(error.message);
      }
    };

    fetchJobs();
  }, []);

  // ฟังก์ชันสำหรับการค้นหา
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredData(tableData); // ถ้าพิมพ์ว่าง ให้คืนค่าข้อมูลทั้งหมด
    } else {
      setFilteredData(
        tableData.filter((job) => job.JobName.toLowerCase().includes(query))
      );
    }
  };

  // ✅ ฟังก์ชันสำหรับกดปุ่ม "สมัครงาน"
  const handleApply = (jobId) => {
    // สั่ง navigate ไปยังเส้นทางฟอร์ม + jobId
    navigate(`/registerFrom/${jobId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 flex flex-col font-sans">
      <div className="container mx-auto">
        {/* ✅ แสดง Popup นโยบายความเป็นส่วนตัว */}
        {showPrivacyPolicy && (
          <Notification onClose={() => setShowPrivacyPolicy(false)} />
        )}
        {/* ✅ เพิ่มช่องค้นหางาน */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">
            📋 รายชื่องานทั้งหมด
          </h2>
          <input
            type="text"
            placeholder="🔍 ค้นหาชื่องาน..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error ? (
          <p className="text-red-500 text-center text-lg">{error}</p>
        ) : tableData.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">ไม่พบข้อมูล</p>
        ) : (
          <div className="overflow-x-auto ">
            <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden ">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
                  <th className="px-6 py-3 font-semibold">#</th>
                  <th className="px-6 py-3 font-semibold">ชื่องาน</th>
                  <th className="px-6 py-3 w-1/3 font-semibold">รายละเอียด</th>
                  <th className="px-6 py-3 font-semibold">ที่อยู่</th>
                  <th className="px-6 py-3 text-center font-semibold">สถานะ</th>
                  <th className="px-6 py-3 text-center font-semibold">
                    สมัครงาน
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-4 text-gray-500 font-semibold"
                    >
                      ❌ ไม่พบงานที่คุณค้นหา
                    </td>
                  </tr>
                ) : (
                  filteredData.map((job, index) => {
                    const isClosed = !job.IsActive;

                    return (
                      <tr key={index} className="hover:bg-gray-100 border-b">
                        <td className="px-6 py-3">{index + 1}</td>
                        <td className="px-6 py-3 font-semibold">
                          {job.JobName}
                        </td>
                        <td className="px-6 py-3 text-gray-600 whitespace-pre-line font-semibold">
                          {job.Description}
                        </td>
                        <td className="px-6 py-3">{job.Location}</td>
                        <td className="px-6 py-3 text-center">
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
                        <td className="px-6 py-3 text-center">
                          <button
                            className={`px-5 py-2 font-semibold text-white rounded-lg transition-all transform shadow-lg ${
                              isClosed
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 hover:shadow-xl"
                            }`}
                            disabled={isClosed}
                            onClick={() => !isClosed && handleApply(job.id)}
                          >
                            {isClosed ? "ปิดรับสมัคร" : "สมัครงาน"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
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
