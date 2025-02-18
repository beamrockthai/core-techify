import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); // ข้อความ Popup
  const [isErrorPopup, setIsErrorPopup] = useState(false); // แยก Error Popup
  const [shake, setShake] = useState(false); // ✅ เอฟเฟกต์สั่น

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    setPopupMessage("กำลังเข้าสู่ระบบ...");
    setIsErrorPopup(false);

    try {
      const userData = { email, password };
      console.log("🔹 ส่งข้อมูลไปที่ Backend:", userData);

      const response = await login(userData);
      console.log("✅ Login successful:", response);

      if (response.token) {
        localStorage.setItem("token", response.token);
        console.log("🔑 Token saved:", response.token);

        setTimeout(() => {
          setPopupMessage("");
          window.location.reload();
        }, 500);
      } else {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        setPopupMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        setIsErrorPopup(true);
        setShake(true); // ✅ สั่น Popup
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      setPopupMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      setIsErrorPopup(true);
      setShake(true); // ✅ สั่น Popup
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-sm bg-white shadow-lg p-8 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          เข้าสู่ระบบ
        </h2>

        {/* แสดงข้อความ Error */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-700 font-medium">อีเมล</span>
          </label>
          <input
            type="email"
            placeholder="กรุณากรอกอีเมล"
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
          className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-700">
            ยังไม่มีบัญชีผู้ใช้?{" "}
            <a href="/register" className="text-primary underline">
              ลงทะเบียน
            </a>
          </p>
        </div>
      </div>

      {/* Popup แจ้งเตือน */}
      {popupMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity">
          <div
            className={`bg-white p-6 rounded-lg shadow-lg text-center relative max-w-xs sm:max-w-sm animate-fade-in ${
              shake ? "animate-shake" : ""
            }`}
          >
            {isErrorPopup ? (
              <>
                <button
                  className="absolute top-2 right-2 btn btn-circle btn-sm btn-ghost text-gray-500 hover:text-gray-800"
                  onClick={() => setPopupMessage("")}
                >
                  ✖
                </button>
                <div className="flex flex-col items-center">
                  <span className="text-red-500 text-3xl">⚠️</span>
                  <p className="text-lg font-semibold text-red-600 mt-2">
                    {popupMessage}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <span className="loading loading-spinner loading-lg text-primary mb-2"></span>
                <p className="text-lg font-semibold text-gray-800">
                  {popupMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
