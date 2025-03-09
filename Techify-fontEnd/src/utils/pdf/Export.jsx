import React, { forwardRef } from "react";

const PDFComponent = forwardRef(({ job }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-white p-10 border rounded-lg shadow-lg w-[210mm] h-[297mm] mx-auto"
    >
      {/* โลโก้หน่วยงาน */}
      <div className="text-center mb-4">
        <img
          src="https://example.com/logo.png"
          alt="โลโก้"
          className="w-32 mx-auto"
        />
      </div>

      {/* หัวเรื่องเอกสาร */}
      <h1 className="text-2xl font-bold text-center mb-4">หนังสือรับรอง</h1>

      {/* ข้อมูลเอกสาร */}
      <p className="text-lg">
        สำนักงานคณะกรรมการราชการ <br />
        เรื่อง: ขอรับรองการทำงานของ {job?.Job?.JobName || "ไม่ระบุ"}
      </p>

      {/* รูปถ่าย */}
      <div className="text-center mt-5">
        <img
          src={job?.image || "https://example.com/profile.jpg"}
          alt="รูปถ่าย"
          className="w-32 h-40 mx-auto border"
        />
      </div>

      {/* ลายเซ็น */}
      <div className="text-right mt-10">
        <img
          src="https://example.com/signature.png"
          alt="ลายเซ็น"
          className="w-40 inline-block"
        />
        <p>นายกรรมการราชการ</p>
      </div>
    </div>
  );
});

export default PDFComponent;
