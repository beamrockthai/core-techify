import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import { getJobHistory } from "../api/registerJob";
import TableHistory from "../components/TablsHistoryUser";
import Banner from "../components/Banner";

const JobHistoryPage = () => {
  const [jobHistory, setJobHistory] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getJobHistory();
      console.log("✅ Data from API:", response);

      if (response && response.success && Array.isArray(response.data)) {
        setJobHistory(response.data);
      } else {
        console.error("❌ API response is not an array:", response);
        setJobHistory([]);
      }
    } catch (error) {
      console.error("❌ Error fetching job history:", error);
      setJobHistory([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // ✅ Fade-in เมื่อโหลดหน้า
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gray-100 flex flex-col"
    >
      <div className="container mx-auto px-4 py-6 flex-1 from-white via-purple-200 to-white">
        {/* ✅ Title Animation */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }} // ✅ Slide-in จากซ้าย
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl font-semibold text-gray-700 text-center md:text-left 
          pt-6 mb-6 md:mb-8 border-b-2 border-gray-300 pb-2 "
        >
          ประวัติการสมัครงานของคุณ
        </motion.h2>

        {/* ✅ TableHistory Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} // ✅ Slide-in จากล่าง
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TableHistory data={jobHistory} refreshData={fetchData} />
        </motion.div>
      </div>

      {/* ✅ Banner Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // ✅ Fade-in สำหรับ Banner
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-12 w-screen px-15"
      >
        <Banner />
      </motion.div>
    </motion.div>
  );
};

export default JobHistoryPage;
