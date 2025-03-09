import React from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import not1 from "../assets/1A.png";
import not2 from "../assets/2B.png";
import not3 from "../assets/3C.png";
import not4 from "../assets/4D.png";
import not5 from "../assets/5Test.png";
import not6 from "../assets/6T.png";

const Ifcomponents = () => {
  const cards = [
    {
      id: 1,
      title: "1.เข้าสู่ระบบ/สมัครสมาชิก",
      src: not3,
      description:
        "เข้าสู่ระบบด้วยบัญชีที่มีอยู่ หรือสมัครสมาชิกใหม่เพื่อเริ่มการสมัคร",
    },
    {
      id: 2,
      title: "2.เลือกตำแหน่งที่ต้องการสมัครงาน",
      src: not4,
      description: "ค้นหาตำแหน่งที่เหมาะสมจากเมนู “ตำแหน่งงานว่าง”",
    },
    {
      id: 3,
      title: "3.กรอกข้อมูลและเอกสาร",
      src: not5,
      description: "ใส่ข้อมูลส่วนตัว ประสบการณ์ทำงาน และแนบเอกสารที่เกี่ยวข้อง",
    },
    {
      id: 4,
      title: "4.ตรวจสอบข้อมูลและยืนยันการสมัคร",
      src: not6,
      description: "ตรวจสอบความถูกต้องก่อนกดยืนยันการสมัคร",
    },
    {
      id: 5,
      title: "5.ติดตามสถานะเอกสาร",
      src: not2,
      description: "รอรับอีเมลแจ้งเตือน หรือเช็คสถานะผ่านระบบ",
    },
    {
      id: 6,
      title: "6.ดาวน์โหลดแบบฟอร์มเอกสาร",
      src: not1,
      description:
        "ดาวน์โหลดแบบฟอร์มเอกสารในรูปแบบ PDF เพื่อใช้ปริ้นในการสมัครงาน",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // ✅ Fade-in เมื่อโหลดหน้า
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-12"
    >
      {/* ✅ หัวข้อหลัก */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl font-bold text-center text-gray-800 mb-12"
      >
        เงื่อนไขในการสมัคร
      </motion.h1>

      {/* ✅ Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }} // ✅ Effect ทีละอัน
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }} // ✅ ขยายขึ้นเล็กน้อยเมื่อ hover
            className="card bg-white shadow-lg rounded-xl p-6 text-center flex flex-col items-center space-y-4"
          >
            {/* ✅ รูปภาพ */}
            <figure className="flex justify-center mb-4">
              <motion.img
                src={card.src}
                alt={card.title}
                className="w-24 h-24 object-contain"
                whileHover={{ scale: 1.1 }} // ✅ ขยายรูปเล็กน้อยเมื่อ hover
                transition={{ duration: 0.3 }}
              />
            </figure>

            {/* ✅ เนื้อหา */}
            <div className="card-body w-full">
              <h2 className="card-title text-lg font-semibold text-center">
                {card.title}
              </h2>
              <p className="text-gray-600 text-left">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Ifcomponents;
