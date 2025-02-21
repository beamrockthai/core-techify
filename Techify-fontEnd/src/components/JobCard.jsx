import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="card bg-base-100 shadow-md rounded-xl p-3 h-[250px] flex flex-col justify-between w-full">
      <div className="flex-1">
        {/* Job Title */}
        <div className="flex items-center mb-1">
          <span className="text-lg">💼</span>
          <h3 className="ml-2 text-md font-semibold truncate">{job.JobName}</h3>
        </div>

        {/* Location */}
        <p className="text-gray-500 text-sm">{job.Location}</p>

        {/* รายละเอียดงาน */}
        <p className="text-gray-600 text-xs mt-1 line-clamp-2">
          {job.Description}
        </p>
      </div>

      {/* สถานะการสมัคร */}
      <div className="flex justify-between items-center mt-3">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            job.IsActive
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {job.IsActive ? "เปิดรับสมัคร" : "ปิดรับสมัคร"}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
