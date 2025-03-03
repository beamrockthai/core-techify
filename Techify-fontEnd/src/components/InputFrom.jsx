import React, { useState, useEffect } from "react";
import * as getUserProfile from "../api/userApi"; // ✅ ดึงข้อมูลผู้ใช้จาก API

const InputForm = ({ onInputChange }) => {
  console.log("✅ InputForm component is rendering...");

  // ✅ ดึงข้อมูลผู้ใช้จาก API และเติมค่าในฟอร์ม
  const [formData, setFormData] = useState({
    additionalPersonalInfo: {
      gender: "",
      bloodType: "",
      height: "",
      weight: "",
      ethnicity: "",
      religion: "",
    },
    currentAddress: {
      houseNumber: "",
      village: "",
      street: "",
      subDistrict: "",
      district: "",
      province: "",
      postalCode: "",
      phoneNumber: "",
    },
    emergencyContact: {
      fullName: "",
      phoneNumber: "",
      houseNumber: "",
      village: "",
      street: "",
      subDistrict: "",
      district: "",
      province: "",
    },
    educationHistory: "",
    workHistory: [],
    specialSkills: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        console.log("📌 User Data from API:", userData);

        // ✅ เติมค่าที่มีอยู่จาก Database ลงใน Form
        setFormData({
          additionalPersonalInfo: userData?.additionalPersonalInfo || {
            gender: "",
            bloodType: "",
            height: "",
            weight: "",
            ethnicity: "",
            religion: "",
          },
          currentAddress: userData?.currentAddress || {
            houseNumber: "",
            village: "",
            street: "",
            subDistrict: "",
            district: "",
            province: "",
            postalCode: "",
            phoneNumber: "",
          },
          emergencyContact: userData?.emergencyContact || {
            fullName: "",
            phoneNumber: "",
            houseNumber: "",
            village: "",
            street: "",
            subDistrict: "",
            district: "",
            province: "",
          },
          educationHistory: userData?.educationHistory || "",
          workHistory: userData?.workHistory || [],
          specialSkills: userData?.specialSkills || "",
        });
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // ✅ ฟังก์ชันอัปเดตค่าใน State
  const handleChange = (e) => {
    const { id, value } = e.target;
    const keys = id.split(".");

    setFormData((prev) => {
      let updatedFormData;
      if (keys.length > 1) {
        updatedFormData = {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: value,
          },
        };
      } else {
        updatedFormData = {
          ...prev,
          [id]: value,
        };
      }

      console.log("🟢 Updated FormData:", updatedFormData);
      onInputChange(updatedFormData); // ✅ ส่งข้อมูลไปยัง `RegisterFromPage`
      return updatedFormData;
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        {/* ✅ ข้อมูลเพิ่มเติม */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">ข้อมูลเพิ่มเติม</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              "gender",
              "bloodType",
              "height",
              "weight",
              "ethnicity",
              "religion",
            ].map((field) => (
              <div key={field} className="form-control">
                <label className="label">{field}</label>
                <input
                  id={`additionalPersonalInfo.${field}`}
                  value={formData.additionalPersonalInfo[field]}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ✅ ที่อยู่ปัจจุบัน */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">ที่อยู่ปัจจุบัน</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              "houseNumber",
              "village",
              "street",
              "subDistrict",
              "district",
              "province",
              "postalCode",
              "phoneNumber",
            ].map((field) => (
              <input
                key={field}
                id={`currentAddress.${field}`}
                placeholder={field}
                value={formData.currentAddress[field]}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            ))}
          </div>
        </div>

        {/* ✅ ผู้ติดต่อฉุกเฉิน */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">ที่อยู่กรณีฉุกเฉิน</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              "fullName",
              "phoneNumber",
              "houseNumber",
              "village",
              "street",
              "subDistrict",
              "district",
              "province",
            ].map((field) => (
              <input
                key={field}
                id={`emergencyContact.${field}`}
                placeholder={field}
                value={formData.emergencyContact[field]}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            ))}
          </div>
        </div>

        {/* ✅ ประวัติการศึกษา */}
        <div className="form-control">
          <label className="label">ประวัติการศึกษา</label>
          <textarea
            id="educationHistory"
            value={formData.educationHistory}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-24"
          ></textarea>
        </div>

        {/* ✅ ประวัติการทำงาน */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">ประวัติการทำงาน</h3>
          {formData.workHistory.length > 0 ? (
            formData.workHistory.map((job, index) => (
              <p key={index}>
                🔹 {job.companyName} - {job.position}
              </p>
            ))
          ) : (
            <p>ยังไม่ได้ระบุ</p>
          )}
        </div>

        {/* ✅ ทักษะพิเศษ */}
        <div className="form-control">
          <label className="label">ทักษะพิเศษ</label>
          <textarea
            id="specialSkills"
            value={formData.specialSkills}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-24"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
