import React, { useState, useEffect } from "react";
import * as getUserProfile from "../api/userApi"; // ✅ ดึงข้อมูลผู้ใช้จาก API
import AddressSelector from "./AddressSelector";

const InputForm = ({ onInputChange }) => {
  // ✅ สร้าง state สำหรับแบบฟอร์ม
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birhDate: "",
    age: "",
    month: "",
    nationality: "",
    ethnicity: "",
    religion: "",
    placeOfBirth: "",
    maritalStatus: "",

    // ที่อยู่ปัจจุบัน
    houseNumber: "",
    village: "",
    subdistrict: "",
    district: "",
    province: "",
    postalCode: "",
    phoneNumber: "",

    // ข้อมูลบิดา
    firstNameDad: "",
    lastNameDad: "",
    nationalityDad: "",
    occupationDad: "",

    // ข้อมูลมารดา
    firstNameMother: "",
    lastNameMother: "",
    nationalityMother: "",
    occupationMother: "",

    // ผู้ติดต่อฉุกเฉิน
    firstNameEmergency: "",
    lastNameEmergency: "",
    phoneNumberEmergency: "",
    houseNumberEmergency: "",
    villageEmergency: "",
    alleyRoad: "",
    subdistrictEmergency: "",
    districtEmergency: "",
    provinceEmergency: "",

    // ประวัติการศึกษา
    degreeEarned: "",
    major: "",
    gpa: "",
    institutionName: "",
    periodofStudy: "",

    // ประวัติการทำงาน
    workPlace: "",
    position: "",
    lastSalary: "",
    employmentDuration: "",
    reason: "",

    // ทักษะพิเศษ
    specialSkills: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        setFormData((prev) => ({
          ...prev,
          ...userData,
        }));
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = { ...prev, [id]: value };

      console.log("🟢 ข้อมูลที่อัปเดตใน InputForm:", updatedFormData);

      // ✅ ส่งข้อมูลกลับไปยัง RegisterFromPage
      onInputChange(updatedFormData);

      return updatedFormData;
    });
  };

  const handleAddressChange = (address) => {
    setFormData((prev) => ({
      ...prev,
      ...address, // ✅ อัปเดตค่า จังหวัด, อำเภอ, ตำบล
    }));
    onInputChange({
      ...formData,
      ...address,
    });
  };

  return (
    <div className="max-w-20xl mx-auto px-5 py-10">
      <div className=" rounded-lg p-6 space-y-6 ">
        {/* ✅ ข้อมูลส่วนตัว */}
        <div className="bg-white-100 p-4 rounded-md">
          <h1 className="text-lg font-semibold">ข้อมูลส่วนตัว</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { id: "firstName", label: "ชื่อ" },
              { id: "lastName", label: "นามสกุล" },
              { id: "birhDate", label: "วันเดือนปีเกิด" },
              { id: "age", label: "อายุ" },
              { id: "month", label: "เดือน" },
              { id: "nationality", label: "สัญชาติ" },
              { id: "ethnicity", label: "เชื้อชาติ" },
              { id: "religion", label: "ศาสนา" },
              { id: "placeOfBirth", label: "สถานที่เกิด" },
            ].map((field) => (
              <input
                key={field.id}
                id={field.id}
                placeholder={field.label}
                value={formData[field.id]}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            ))}
          </div>
        </div>

        {/* ✅ ที่อยู่ปัจจุบัน */}
        <div className="bg-white-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">ที่อยู่ปัจจุบัน</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* ✅ บ้านเลขที่ & หมู่ที่ */}
            <input
              id="houseNumber"
              placeholder="บ้านเลขที่"
              value={formData.houseNumber}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <input
              id="village"
              placeholder="หมู่ที่"
              value={formData.village}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            {/* ✅ ใช้ AddressSelector สำหรับเลือก จังหวัด → อำเภอ → ตำบล */}
            <div className="col-span-2 md:col-span-3">
              <AddressSelector onAddressChange={handleAddressChange} />
            </div>

            {/* ✅ รหัสไปรษณีย์ & เบอร์โทรศัพท์ */}
            <input
              id="postalCode"
              placeholder="รหัสไปรษณีย์"
              value={formData.postalCode}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <input
              id="phoneNumber"
              placeholder="เบอร์โทรศัพท์"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* ✅ ข้อมูลบิดา มารดา */}
        <div className="bg-white-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">ข้อมูลบิดา-มารดา</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: "firstNameDad", label: "ชื่อบิดา" },
              { id: "lastNameDad", label: "นามสกุล" },
              { id: "nationalityDad", label: "สัญชาติ" },
              { id: "occupationDad", label: "อาชีพ" },
              { id: "firstNameMother", label: "ชื่อมารดา" },
              { id: "lastNameMother", label: "นามสกุล" },
              { id: "nationalityMother", label: "สัญชาติ" },
              { id: "occupationMother", label: "อาชีพ" },
            ].map((field) => (
              <input
                key={field.id}
                id={field.id}
                placeholder={field.label}
                value={formData[field.id]}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            ))}
          </div>
        </div>

        {/* ✅ ที่อยู่ฉุกเฉิน */}
        <div className="bg-white-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">ในกรณีเร่งด่วนติดต่อได้ที่</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { id: "firstNameEmergency", label: "ชื่อ" },
              { id: "lastNameEmergency", label: "นามสกุล" },
              { id: "phoneNumberEmergency", label: "เบอร์โทรศัพท์" },
              { id: "houseNumberEmergency", label: "บ้านเลขที่" },
              { id: "villageEmergency", label: "หมู่ที่" },
              { id: "alleyRoad", label: "ซอย/ถนน" },
              { id: "subdistrictEmergency", label: "ตำบล" },
              { id: "districtEmergency", label: "อำเภอ" },
              { id: "provinceEmergency", label: "จังหวัด" },
            ].map((field) => (
              <input
                key={field.id}
                id={field.id}
                placeholder={field.label}
                value={formData[field.id]}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            ))}
          </div>
        </div>

        {/* ✅ สถานะสมรส */}
        <div className="bg-white-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">สถานะสมรส</h3>
          <select
            id="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">เลือกสถานะ</option>
            <option value="โสด">โสด</option>
            <option value="สมรส">สมรส</option>
            <option value="หย่าร้าง">หย่าร้าง</option>
            <option value="หม้าย">หม้าย</option>
          </select>
        </div>

        {/* ✅ ประวัติการศึกษา */}
        <div className="bg-white-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">ประวัติการศึกษา</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "degreeEarned", label: "วุฒิการศึกษา" },
              { id: "major", label: "สาขาวิชาเอก" },
              { id: "gpa", label: "คะแนนเฉลี่ย" },
              { id: "institutionName", label: "ชื่อสถานศึกษา" },
              { id: "periodofStudy", label: "ระยะเวลาที่ศึกษา" },
            ].map((field) => (
              <input
                key={field.id}
                id={field.id}
                placeholder={field.label}
                value={formData[field.id]}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            ))}
          </div>
        </div>

        {/* ✅ ประวัติการทำงาน */}
        <div className="bg-white-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">ประวัติการทำงาน</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "workPlace", label: "สถานที่ทำงาน" },
              { id: "position", label: "ตำแหน่ง" },
              { id: "lastSalary", label: "เงินเดือนสุดท้าย" },
              { id: "employmentDuration", label: "ระยะเวลาการทำงาน" },
              { id: "reason", label: "เหตุผลที่ออก" },
            ].map((field) => (
              <input
                key={field.id}
                id={field.id}
                placeholder={field.label}
                value={formData[field.id]}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            ))}
          </div>
        </div>

        {/* ✅ ทักษะพิเศษ */}
        <div className="form-control font-semibold">
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
