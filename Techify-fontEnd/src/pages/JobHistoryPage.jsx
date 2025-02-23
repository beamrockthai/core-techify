import React, { useEffect, useState } from "react";
import { getJobHistory } from "../api/registerJob"; // ✅ ใช้ API ที่เพิ่มไว้
import TableHistory from "../components/TablsHistory"; // ✅ แสดงข้อมูลในรูปแบบตาราง
import Banner from "../components/Banner"; // ✅ แสดงข้อความและรูปภาพ

const JobHistoryPage = () => {
  const [jobHistory, setJobHistory] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getJobHistory();
        console.log("✅ Data from API:", response); // 🔹 Debug API Response

        if (response && response.success && Array.isArray(response.data)) {
          setJobHistory(response.data);
        } else {
          console.error("❌ API response is not an array:", response);
          setJobHistory([]); // ❌ ป้องกัน `undefined` หรือ `null`
        }
      } catch (error) {
        console.error("❌ Error fetching job history:", error);
        setJobHistory([]); // ❌ ป้องกันการพังของ UI
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid min-h-screen grid-rows-[1fr_auto]">
      {/* ส่วนเนื้อหาหลัก */}
      <div className="container mx-auto px-4 py-6">
        <TableHistory data={jobHistory} />
      </div>

      {/* Banner อยู่ล่างสุด */}
      <div className="mt-12 w-full px-15">
        <Banner />
      </div>
    </div>
  );
};

export default JobHistoryPage;
