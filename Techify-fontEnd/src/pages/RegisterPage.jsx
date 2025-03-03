import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authApi";
import InputField from "../components/InputField";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    nationalId: "",
    birhDate: "",
    houseNumber: "",
    village: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // ✅ Popup ยืนยันข้อมูล

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "birhDate" && value) {
      let year = parseInt(value.split("-")[0], 10);
      if (year > 2500) {
        year -= 543;
        newValue = `${year}-${value.split("-")[1]}-${value.split("-")[2]}`;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue || "",
    }));
  };

  const validateForm = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    setError("");
    setShowConfirmPopup(true);
  };

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    try {
      console.log("📡 Sending data to backend:", formData);

      const data = await register(formData);
      console.log("✅ Register successful:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("🔑 Token saved:", data.token);
        window.location.href = "/jobs";
      } else {
        setError("สมัครสมาชิกสำเร็จ แต่ไม่ได้รับ Token");
      }
    } catch (err) {
      console.error("❌ Register failed:", err);
      setError(err.message || "❌ Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="card w-full max-w-lg sm:max-w-2xl lg:max-w-4xl bg-white shadow-xl p-5">
        <h2 className="text-2xl font-bold text-center mb-4">สมัครสมาชิก</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="ชื่อจริง"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputField
            label="นามสกุล"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <InputField
            label="อีเมล"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="รหัสผ่าน"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputField
            label="หมายเลขโทรศัพท์"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <InputField
            label="เลขบัตรประชาชน"
            type="text"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
          />
          <InputField
            label="วันเดือนปีเกิด"
            type="date"
            name="birhDate"
            value={formData.birhDate}
            onChange={handleChange}
          />
          <InputField
            label="บ้านเลขที่"
            type="text"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
          />
          <InputField
            label="หมู่บ้าน"
            type="text"
            name="village"
            value={formData.village}
            onChange={handleChange}
          />
          <InputField
            label="จังหวัด"
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
          />
          <InputField
            label="อำเภอ"
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
          />
          <InputField
            label="ตำบล"
            type="text"
            name="subDistrict"
            value={formData.subDistrict}
            onChange={handleChange}
          />
          <InputField
            label="รหัสไปรษณีย์"
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </form>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            className="btn btn-outline btn-primary w-full sm:w-auto"
            onClick={() => navigate("/login")}
          >
            ย้อนกลับไปหน้าเข้าสู่ระบบ
          </button>
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={handleSubmit}
          >
            สมัครสมาชิก
          </button>
        </div>
      </div>

      {/* ✅ Popup ยืนยันข้อมูล (รองรับ Responsive) */}
      {showConfirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg w-full">
            <h3 className="text-xl font-bold mb-3">ยืนยันข้อมูล</h3>
            <p className="text-gray-600 mb-4">กรุณาตรวจสอบข้อมูลก่อนสมัคร</p>
            <div className="grid grid-cols-1 gap-2 text-left text-sm">
              <p>
                <strong>ชื่อ:</strong> {formData.firstName} {formData.lastName}
              </p>
              <p>
                <strong>อีเมล:</strong> {formData.email}
              </p>
              <p>
                <strong>โทรศัพท์:</strong> {formData.phoneNumber}
              </p>
              <p>
                <strong>จังหวัด:</strong> {formData.province}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <button
                className="btn btn-outline btn-error w-full sm:w-auto"
                onClick={() => setShowConfirmPopup(false)}
              >
                แก้ไข
              </button>
              <button
                className="btn btn-success w-full sm:w-auto"
                onClick={handleRegister}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
