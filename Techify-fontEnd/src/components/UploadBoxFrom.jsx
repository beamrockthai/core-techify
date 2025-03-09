import React, { useRef, useState } from "react";

function UploadBoxFrom({ label, onFileSelect }) {
  const fileInputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ตรวจสอบขนาดไฟล์ (5 MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("ไฟล์ต้องไม่เกิน 5 MB");
        e.target.value = null;
        return;
      }

      // สร้าง URL สำหรับ preview
      const tempPreview = URL.createObjectURL(file);
      setPreviewURL(tempPreview);

      // ส่งข้อมูลไฟล์ไปยังฟังก์ชันหลัก
      onFileSelect?.({ file, previewURL: tempPreview });
    }
  };

  return (
    <div className="flex items-center gap-x-6 w-full max-w-3xl mx-auto">
      {/* ปุ่มเลือกไฟล์ (ขนาดให้ตรงกับภาพ) */}
      <button
        className="btn btn-outline btn-primary w-20 h-10 flex items-center justify-center text-md"
        onClick={handleBoxClick}
      >
        เลือก
      </button>

      {/* Label และ Preview */}
      <div className="flex items-center w-full">
        <span className="text-lg text-gray-700">{label}</span>

        {/* Preview ภาพถ้ามี */}
        {previewURL && (
          <img
            src={previewURL}
            alt="Preview"
            className="w-14 h-14 border border-gray-300 rounded-md object-cover ml-4"
          />
        )}
      </div>

      {/* Input File ซ่อนอยู่ */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/gif"
      />
    </div>
  );
}

export default UploadBoxFrom;
