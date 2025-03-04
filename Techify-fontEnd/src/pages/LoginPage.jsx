import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { initiateLineLogin } from "../api/initiateLineLogin ";
import Banner from "../components/Banner";

// ✅ 1. เพิ่มหลายรูปไว้ใน Array
import not1 from "../assets/not.jpg";
import not2 from "../assets/not2.jpg";
import not3 from "../assets/not3.jpg";
import not4 from "../assets/not4.jpg";
import not5 from "../assets/not5.jpg";

const backgroundImages = [not1, not2, not3, not4, not5];

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ✅ 2. เปลี่ยนรูปทุก 5 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    setTimeout(async () => {
      try {
        const response = await login({ email, password });
        if (response.token) {
          localStorage.setItem("token", response.token);
          navigate("/main");
        } else {
          setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        }
      } catch (err) {
        setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const handleLineLogin = () => {
    initiateLineLogin();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/*  ส่วนหลักของหน้า Login */}
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center bg-gray-100 relative">
        {/*  Background ที่เปลี่ยนและเลื่อนอัตโนมัติ */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-80 animate-bgScroll transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          }}
        ></div>

        {/* ส่วนข้อความต้อนรับ */}
        <div className="hidden md:flex flex-col text-black drop-shadow-lg w-2/5 text-left z-10 p-10 bg-white/50 backdrop-blur-md rounded-lg">
          <h1 className="text-3xl font-bold mb-2 leading-tight text-center ">
            องค์การบริหารส่วนจังหวัดนนทบุรี
          </h1>
          <p className="text-lg opacity-90 text-center">
            NONTHABURI PROVINCIAL ADMINISTRATIVE ORGANIZATION
          </p>
        </div>

        {/*  ฟอร์มล็อกอิน */}
        <div className="w-full md:w-2/5 flex justify-center relative z-10">
          <div className="bg-white shadow-lg border border-gray-200 p-8 rounded-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold text-gray-800 text-center">
              เข้าสู่ระบบ
            </h3>
            <p className="text-gray-500 text-center mb-4">
              กรุณาลงชื่อเข้าใช้บัญชีของคุณ
            </p>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="space-y-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  type="email"
                  placeholder="mail@gmail.com"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <button
                className={`btn w-full ${
                  loading
                    ? "btn-disabled"
                    : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </button>

              {/* ปุ่มล็อกอินผ่าน LINE */}
              <button
                className="btn w-full btn-outline flex items-center justify-center"
                onClick={handleLineLogin}
              >
                <img
                  src="/src/assets/LINE_Brand_icon.png"
                  alt="LINE Logo"
                  className="w-6 h-6 mr-2"
                />
                เข้าสู่ระบบด้วย LINE
              </button>
            </div>

            <p className="text-center text-sm text-gray-700 mt-4">
              คุณยังไม่มีบัญชีใช่ไหม?{" "}
              <a href="/register" className="text-purple-500 hover:underline">
                สมัครสมาชิก
              </a>
            </p>
          </div>
        </div>
      </div>

      {/*  Loading Spinner เมื่อกดล็อกอิน */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center animate-fade">
            <div className="loading loading-spinner loading-lg text-purple-600"></div>
            <p className="text-gray-800 mt-4 text-lg font-semibold animate-pulse">
              กำลังเข้าสู่ระบบ...
            </p>
          </div>
        </div>
      )}

      {/* ✅ Banner อยู่ล่างสุด */}
      <div className="mt-auto">
        <Banner />
      </div>
    </div>
  );
};

export default LoginPage;
