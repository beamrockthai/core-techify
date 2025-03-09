import React, { useState } from "react";
import thailandData from "../data/thailand.json"; // ✅ นำเข้า JSON

const AddressSelector = ({ onAddressChange }) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");

  const provinces = thailandData.map((province) => province.name_th);
  const selectedProvinceData = thailandData.find(
    (p) => p.name_th === selectedProvince
  );
  const districts = selectedProvinceData
    ? selectedProvinceData.amphure.map((a) => a.name_th)
    : [];
  const selectedDistrictData = selectedProvinceData
    ? selectedProvinceData.amphure.find((a) => a.name_th === selectedDistrict)
    : null;
  const subdistricts = selectedDistrictData
    ? selectedDistrictData.tambon.map((t) => t.name_th)
    : [];

  const handleProvinceChange = (e) => {
    const value = e.target.value;
    setSelectedProvince(value);
    setSelectedDistrict("");
    setSelectedSubdistrict("");
    onAddressChange({ province: value, district: "", subdistrict: "" });
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setSelectedDistrict(value);
    setSelectedSubdistrict("");
    onAddressChange({
      province: selectedProvince,
      district: value,
      subdistrict: "",
    });
  };

  const handleSubdistrictChange = (e) => {
    const value = e.target.value;
    setSelectedSubdistrict(value);
    onAddressChange({
      province: selectedProvince,
      district: selectedDistrict,
      subdistrict: value,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* ✅ Dropdown จังหวัด */}
      <div>
        <label className="block font-semibold">จังหวัด</label>
        <select
          className="select select-bordered w-full"
          value={selectedProvince}
          onChange={handleProvinceChange}
        >
          <option value="">เลือกจังหวัด</option>
          {provinces.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Dropdown อำเภอ */}
      <div>
        <label className="block font-semibold">อำเภอ</label>
        <select
          className="select select-bordered w-full"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          disabled={!selectedProvince}
        >
          <option value="">เลือกอำเภอ</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Dropdown ตำบล */}
      <div>
        <label className="block font-semibold">ตำบล</label>
        <select
          className="select select-bordered w-full"
          value={selectedSubdistrict}
          onChange={handleSubdistrictChange}
          disabled={!selectedDistrict}
        >
          <option value="">เลือกตำบล</option>
          {subdistricts.map((subdistrict) => (
            <option key={subdistrict} value={subdistrict}>
              {subdistrict}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AddressSelector;
