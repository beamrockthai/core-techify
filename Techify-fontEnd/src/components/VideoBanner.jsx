import React from "react";

// ✅ นำเข้าวิดีโอจากเครื่อง
import myVideo from "../assets/vdio.mp4";
// ✅ นำเข้าตราสัญลักษณ์จากเครื่อง
import myLogo from "../assets/LogoNew.png"; // เปลี่ยนเป็น path ของโลโก้ที่ต้องการใช้

const VideoBanner = () => {
  return (
    <div className="w-screen bg-base-200 mb-4">
      {/* ✅ เพิ่มขอบล่างเล็กน้อย */}
      <div className="relative w-full h-[400px] sm:h-[480px] md:h-[520px] overflow-hidden border-b-4 border-purple-400">
        {/* ✅ วิดีโอพื้นหลัง */}
        <video
          src={myVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* ✅ Overlay ตราสัญลักษณ์ + เอฟเฟกต์แสง */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 flex items-center justify-center overflow-hidden">
          <img
            src={myLogo}
            alt="Logo"
            className="w-full h-full object-cover scale-125 drop-shadow-[0px_0px_15px_rgba(255,255,255,0.8)]"
          />
        </div>

        {/* ✅ Overlay ข้อความ */}
        <div className="absolute top-[200px] left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white shadow-md font-serif">
            องค์การบริหารส่วนจังหวัดนนทบุรี
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg mt-1 font-light shadow-md font-serif">
            NONTHABURI PROVINCIAL ADMINISTRATIVE ORGANIZATION
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
