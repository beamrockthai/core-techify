import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  // ฟังก์ชันกดปุ่มสมัครงาน
  const handleApplyClick = () => {
    navigate(`/registerFrom/${job.id}`);
  };

  // ฟังก์ชันกดปุ่มดูรายละเอียด
  const handleDetailsClick = () => {
    navigate(`/DetailPage/${job.id}`);
  };

  return (
    <div className="card shadow-md rounded-xl p-4 w-full h-[350px] flex flex-col bg-gradient-to-b from-white to-purple-300 relative">
      {/* ✅ สถานะการสมัคร (มุมขวาบน) */}
      <div className="absolute top-2 right-2">
        <span
          className={`px-3 py-1 text-sm font-semibold rounded-full shadow-md transition ${
            job.IsActive
              ? "bg-green-500 text-white animate-pulse hover:bg-green-600"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {job.IsActive ? "เปิดรับสมัคร" : "ปิดรับสมัคร"}
        </span>
      </div>

      <div className="flex-1 overflow-hidden">
        {/* Job Title */}
        <div className="flex items-center mb-1">
          <h3 className="text-md font-semibold truncate">
            องค์การบริหารส่วนจังหวัดนนทบุรี
          </h3>
        </div>

        {/* Job Position */}
        <div className="flex items-center mb-1">
          <h3 className="text-md truncate">ตำแหน่ง {job.JobName}</h3>
        </div>

        {/* Location */}
        <p className="text-gray-500 text-sm mb-2">🏠 {job.Location}</p>

        {/* รายละเอียดงาน */}
        <div className="text-gray-600 text-xs mt-2 space-y-1 h-[120px] overflow-hidden">
          <p className="font-semibold">หน้าที่รับผิดชอบ</p>
          <p className="whitespace-pre-line break-words line-clamp-4">
            {job.Description}
          </p>
        </div>
      </div>

      {/* ✅ ปุ่มสมัครงาน & ปุ่มรายละเอียด (ขนาดเล็กลง) */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {job.IsActive && (
          <button
            onClick={handleApplyClick}
            className="w-full py-2 text-sm border-2 border-purple-500 text-purple-500 font-medium rounded-lg hover:bg-purple-500 hover:text-white transition"
          >
            สมัคร
          </button>
        )}
        <button
          onClick={handleDetailsClick}
          className="w-full py-2 text-sm border-2 border-purple-500 text-purple-500 font-medium rounded-lg hover:bg-purple-500 hover:text-white transition"
        >
          รายละเอียด
        </button>
      </div>
    </div>
  );
};

export default JobCard;
