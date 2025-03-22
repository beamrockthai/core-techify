import React from "react";
import JobDetail from "../components/Details"; // ✅ นำเข้า JobDetail
import Ifcomponents from "../components/Ifcomponents";

const DetailsPage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <JobDetail /> {/* ✅ แสดง JobDetail ภายใน container */}
        <Ifcomponents />
      </div>
    </div>
  );
};

export default DetailsPage;
