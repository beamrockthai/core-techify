import { useState } from "react";
import { useNavigate } from "react-router-dom"; // สำหรับเปลี่ยนเส้นทาง
import { login } from "../api/authApi";
// import InputField from "../components/InputField";
// import Button from "../components/button"; // ✅ เปลี่ยนเป็นตัวอักษรใหญ่

const LoginPage = () => {
  const navigate = useNavigate(); // ใช้เปลี่ยนหน้า
  const [email, setEmail] = useState(""); // ✅ เปลี่ยนจาก setUsername เป็น setEmail
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const userData = { email, password };
      console.log("🔹 ส่งข้อมูลไปที่ Backend:", userData);

      const response = await login(userData); // เรียก API
      console.log("✅ Login successful:", response);

      // ✅ บันทึก token หรือข้อมูลผู้ใช้ลง localStorage
      localStorage.setItem("user", JSON.stringify(response.user));

      // ✅ เปลี่ยนหน้าไปที่ Jobs
      navigate("/jobs");
    } catch (err) {
      console.error("❌ Login failed:", err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-white shadow-lg p-8 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          เข้าสู่ระบบ
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-700 font-medium">
              ชื่อผู้ใช้
            </span>
          </label>
          <input
            type="text"
            placeholder="กรุณากรอกชื่อผู้ใช้"
            className="input input-bordered w-full border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text text-gray-700 font-medium">
              รหัสผ่าน
            </span>
          </label>
          <input
            type="password"
            placeholder="กรอกรหัสผ่าน"
            className="input input-bordered w-full border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="btn btn-outline btn-primary w-full"
          onClick={handleLogin}
        >
          เข้าสู่ระบบ
        </button>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-700">
            ยังไม่มีบัญชีผู้ใช้?{" "}
            <a href="/register" className="text-purple-600 underline">
              ลงทะเบียน
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
