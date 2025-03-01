import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="card shadow-md rounded-xl p-3 h-[250px] flex flex-col justify-between w-full bg-gradient-to-b from-white to-purple-300">
      <div className="flex-1">
        {/* Job Title */}
        <div className="flex items-center mb-1">
          <h3 className="ml-0 text-md font-semibold truncate">
            องค์การบริหารส่วนจังหวัดนนทบุรี
          </h3>
        </div>

        {/* Job Position */}
        <div className="flex items-center mb-1">
          <h3 className="ml-0 text-md truncate">ตำแหน่ง {job.JobName}</h3>
        </div>

        {/* Location */}
        <p className="text-gray-500 text-sm mb-2">🏠 {job.Location}</p>

        {/* รายละเอียดงาน */}
        <div className="text-gray-600 text-xs mt-2 space-y-1">
          <p className="font-semibold">หน้าที่รับผิดชอบ</p>
          <p className="whitespace-pre-line break-words overflow-hidden">
            {job.Description}
          </p>
        </div>
      </div>

      {/* สถานะการสมัคร */}
      <div className="flex justify-between items-center mt-3">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            job.IsActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {job.IsActive ? "เปิดรับสมัคร" : "ปิดรับสมัคร"}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
