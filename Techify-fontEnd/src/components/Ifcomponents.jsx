import React from "react";
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
      description: "เข้าสู่ระบบด้วยบัญชีที่มีอยู่ หรือสมัครสมาชิกใหม่เพื่อเริ่มการสมัคร",
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
      description: "ดาวน์โหลดแบบฟอร์มเอกสารในรูปแบบ PDF เพื่อใช้ปริ้นในการสมัครงาน",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* ✅ หัวข้อหลัก พร้อมเพิ่มระยะห่าง */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
        เงื่อนไขในการสมัคร
      </h1>

      {/* ✅ Grid Layout เพิ่มระยะห่างแนวตั้ง (gap-y-10) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card bg-white shadow-lg rounded-xl p-6 text-center flex flex-col items-center space-y-4"
          >
            {/* ✅ รูปภาพตรงกลาง และเพิ่ม margin-bottom */}
            <figure className="flex justify-center mb-4">
              <img src={card.src} alt={card.title} className="w-24 h-24 object-contain" />
            </figure>

            <div className="card-body w-full">
              {/* ✅ Title อยู่ตรงกลาง 100% */}
              <h2 className="card-title text-lg font-semibold text-center">{card.title}</h2>
              {/* ✅ Description ชิดซ้าย */}
              <p className="text-gray-600 text-left">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ifcomponents;
