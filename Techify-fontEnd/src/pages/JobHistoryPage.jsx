import React, { useEffect, useState } from "react";
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="container mx-auto px-4 py-6 flex-1">
        <h2
          className="text-xl md:text-2xl font-semibold text-gray-700 text-center md:text-left 
    pt-6 mb-6 md:mb-8 border-b-2 border-gray-300 pb-2"
        >
          ประวัติการสมัครงานของคุณ
        </h2>

        <TableHistory data={jobHistory} refreshData={fetchData} />
      </div>
      <div className="mt-12 w-screen px-15">
        <Banner />
      </div>
    </div>
  );
};

export default JobHistoryPage;
