import React from "react";

// ✅ นำเข้าวิดีโอจากเครื่อง
import myVideo from "../assets/vdio.mp4";

const VideoBanner = () => {
  return (
    <div className="w-screen bg-base-200 mb-4">
      {" "}
      {/* ✅ เพิ่มขอบล่างเล็กน้อย */}
      <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] overflow-hidden border-b-4 border-purple-400 ">
        <video
          src={myVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default VideoBanner;
