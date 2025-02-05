import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authApi";
import InputField from "../components/InputField";

const RegisterPage = () => {
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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // เพิ่มสถานะการรอ
  const navigate = useNavigate();

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

  const handleRegister = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่ากรอกข้อมูลครบทุกช่องหรือไม่
    const isFormComplete = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    if (!isFormComplete) {
      setError("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    setLoading(true); // เปิดสถานะการรอ
    try {
      console.log("📡 Sending data to backend:", formData);
      const data = await register(formData);
      console.log("✅ Register successful:", data);
      setError("");
      setSuccess(true);
      setTimeout(() => {
        setLoading(false); // ปิดสถานะการรอ
        navigate("/jobs");
      }, 3000); // รอ 3 วินาทีก่อนเปลี่ยนหน้า
    } catch (err) {
      console.error("❌ Register failed:", err);
      setError(err.message || "❌ Register failed");
      setLoading(false); // ปิดสถานะการรอ
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-4xl bg-white shadow-xl p-5">
        <h2 className="text-2xl font-bold text-center mb-4">สมัครสมาชิก</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {success && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">สมัครสมาชิกสำเร็จ!</h3>
              <p>กำลังพาคุณไปยังหน้าใช้งาน...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-3 gap-4">
          <InputField
            label="ชื่อจริง"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="กรอกชื่อจริง"
          />

          <InputField
            label="นามสกุล"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="กรอกนามสกุล"
          />

          <InputField
            label="อีเมล"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="กรอกอีเมล"
          />

          <InputField
            label="รหัสผ่าน"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="กรอกรหัสผ่าน"
          />

          <InputField
            label="หมายเลขโทรศัพท์"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="กรอกหมายเลขโทรศัพท์"
          />

          <InputField
            label="เลขบัตรประชาชน"
            type="text"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            placeholder="กรอกเลขบัตรประชาชน"
          />

          <InputField
            label="วันเดือนปีเกิด"
            type="date"
            name="birhDate"
            value={formData.birhDate}
            onChange={handleChange}
            placeholder="เลือกวันเดือนปีเกิด"
          />

          <InputField
            label="บ้านเลขที่"
            type="text"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            placeholder="กรอกบ้านเลขที่"
          />

          <InputField
            label="หมู่บ้าน"
            type="text"
            name="village"
            value={formData.village}
            onChange={handleChange}
            placeholder="กรอกหมู่บ้าน"
          />

          <InputField
            label="จังหวัด"
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            placeholder="กรอกจังหวัด"
          />

          <InputField
            label="อำเภอ"
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="กรอกอำเภอ"
          />

          <InputField
            label="ตำบล"
            type="text"
            name="subDistrict"
            value={formData.subDistrict}
            onChange={handleChange}
            placeholder="กรอกตำบล"
          />

          <InputField
            label="รหัสไปรษณีย์"
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="กรอกรหัสไปรษณีย์"
          />

          <div className="col-span-3 flex justify-center gap-4 mt-6">
            <button
              className="btn btn-outline btn-primary w-full md:w-auto"
              type="button"
              onClick={() => navigate("/login")}
            >
              ย้อนกลับไปหน้าเข้าสู่ระบบ
            </button>
            <button
              className={`btn btn-primary w-full md:w-auto ${
                loading ? "btn-disabled" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              สมัครสมาชิก
            </button>
          </div>
        </form>

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
              <p>กำลังดำเนินการสมัครสมาชิก...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
