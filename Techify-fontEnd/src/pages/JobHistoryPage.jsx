import React, { useEffect, useState } from "react";
import { getJobHistory } from "../api/registerJob";
import TableHistory from "../components/TablsHistory";
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
    <div className="grid min-h-screen grid-rows-[1fr_auto] font-sans bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <TableHistory data={jobHistory} refreshData={fetchData} />
      </div>
      <div className="mt-12 w-full px-15">
        <Banner />
      </div>
    </div>
  );
};

export default JobHistoryPage;
