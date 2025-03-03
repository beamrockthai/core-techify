// ~/src/components/UploadBox.jsx
import React, { useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

function UploadBoxFrom({ label, onFileSelect }) {
  const fileInputRef = useRef(null);

  // ✅ เก็บรูป previewURL ใน state ภายใน UploadBox เอง
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

      // สร้าง URL สำหรับ preview ในกล่องนี้เอง
      const tempPreview = URL.createObjectURL(file);
      setPreviewURL(tempPreview);

      // ถ้าจำเป็นต้องให้หน้าพ่อแม่รู้ไฟล์ก็ยังส่งได้
      onFileSelect?.({ file, previewURL: tempPreview });
    }
  };

  return (
    <div className="form-control w-full max-w-2xl mx-auto py-4 px-4">
      {/* Label */}
      <label className="label">
        <span className="label-text text-base font-semibold">{label}</span>
      </label>

      {/* กล่องอัปโหลด */}
      <div
        className="
          flex flex-col items-center justify-center
          border-2 border-dashed border-gray-300 rounded-lg
          py-6 px-4
          text-center
          cursor-pointer
          hover:border-gray-400
          transition
          bg-white
        "
        onClick={handleBoxClick}
      >
        <AiOutlineCloudUpload className="text-5xl text-gray-400 mb-3" />

        <p className="text-blue-600 underline mb-1">อัปโหลดรูปภาพ</p>
        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>

        {/* input type file */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/gif"
        />

        {/* ✅ แสดง preview ในกล่องเดียวกันเลย */}
        {previewURL && (
          <div className="mt-4">
            <img
              src={previewURL}
              alt="Preview"
              className="max-w-xs h-auto border border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadBoxFrom;
