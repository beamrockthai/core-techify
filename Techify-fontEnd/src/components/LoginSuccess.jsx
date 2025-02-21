import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    console.log("🔹 Token from URL:", token);

    if (token) {
      localStorage.setItem("token", token);
      console.log(
        "✅ Token saved in localStorage:",
        localStorage.getItem("token")
      );

      setTimeout(() => {
        setLoading(false);
        navigate("/main", { replace: true }); // 🚀 เปลี่ยนหน้าโดยไม่ต้อง reload
      }, 1500); // รอ 1.5 วินาทีให้ token อัปเดต
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading && (
        <>
          <span className="loading loading-spinner loading-lg"></span>
          <h2 className="mt-4 text-lg font-semibold text-gray-700">
            กำลังเข้าสู่ระบบ...
          </h2>
        </>
      )}
    </div>
  );
};

export default LoginSuccess;
