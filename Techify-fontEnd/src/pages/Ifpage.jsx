import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Ifcomponents from "../components/Ifcomponents";
import Notification from "../components/Notification"; // ✅ Import Popup

const Ifpage = () => {
  const { jobId } = useParams(); // ดึง jobId จาก URL
  const navigate = useNavigate(); // ใช้ navigate เพื่อเปลี่ยนหน้า
  const [showPopup, setShowPopup] = useState(false); // ✅ สร้าง state ควบคุม Popup

  return (
    <section className="min-h-screen bg-purple-100 flex flex-col justify-center items-center p-6">
      <div className="container mx-auto">
        {/* ✅ คง Ifcomponents ไว้ */}
        <Ifcomponents jobId={jobId} />
      </div>

      {/* ✅ ปุ่มย้อนกลับ และ ปุ่มสมัคร */}
      <div className="mt-10 flex gap-6">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border-2 border-purple-500 text-purple-500 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={() => setShowPopup(true)} // ✅ กดแล้วแสดง Popup
          className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition"
        >
          สมัคร
        </button>
      </div>

      {/* ✅ แสดง Popup และเปลี่ยนหน้าโดยส่ง jobId ไปด้วย */}
      {showPopup && <Notification onClose={() => navigate(`/registerFrom/${jobId}`)} />}
    </section>
  );
};

export default Ifpage;
