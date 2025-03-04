import { useEffect, useState } from "react";
import { getUserProfile } from "../api/userApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // State สำหรับเปลี่ยนรหัสผ่าน
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        console.log("📌 API Response:", response.data); // ✅ ตรวจสอบค่าที่ API ส่งมา
        setUser(response.data || {});
      } catch (err) {
        console.error("❌ Error fetching user profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  // อัปโหลดรูปโปรไฟล์
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ตรวจสอบรหัสผ่าน
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!validatePassword(newPassword)) {
      setPasswordError(
        "❌ รหัสผ่านต้องมีตัวอักษรใหญ่, เล็ก, ตัวเลข และอักขระพิเศษ"
      );
      setPasswordValid(false);
    } else {
      setPasswordError("✅ รหัสผ่านถูกต้อง");
      setPasswordValid(true);
    }
  };

  const handleChangePassword = () => {
    if (!validatePassword(password)) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรอกรหัสผ่านให้ถูกต้องตามเงื่อนไข!",
      });
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "รหัสผ่านไม่ตรงกัน!",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "สำเร็จ!",
      text: "เปลี่ยนรหัสผ่านสำเร็จ!",
    });
  };

  if (loading)
    return (
      <p className="text-center text-lg text-gray-700">กำลังโหลดข้อมูล...</p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gradient-to-br from-blue-200 via-purple-200 to-yellow-200 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 md:p-10 relative">
        {/* ปุ่มแก้ไขมุมขวาบน */}
        <button
          className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "ยกเลิก" : "แก้ไข"}
        </button>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-gray-300 shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                ไม่มีรูป
              </div>
            )}
            <div className="mt-3 md:ml-6 text-center md:text-left">
              <h2 className="text-xl font-semibold text-gray-800">
                {`${user.firstName || ""} ${user.lastName || ""}`}
              </h2>
              <p className="text-gray-500">
                {user.email || "example@gmail.com"}
              </p>
            </div>
          </div>
        </div>
        {/* อัปโหลดรูป */}
        {isEditing && (
          <div className="flex justify-center mt-4">
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={handleImageUpload}
            />
          </div>
        )}
        {/* ฟอร์มข้อมูล */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {[
            { label: "ชื่อจริง", key: "firstName" },
            { label: "อีเมล", key: "email", type: "email" },
            { label: "เบอร์โทรศัพท์", key: "phoneNumber" },
            { label: "เลขบัตรประชาชน", key: "nationalId" },
            { label: "บ้านเลขที่", key: "houseNumber" },
            { label: "หมู่บ้าน", key: "village" },
            { label: "ตำบล", key: "subDistrict" },
            { label: "อำเภอ", key: "district" },
            { label: "จังหวัด", key: "province" },
            { label: "รหัสไปรษณีย์", key: "postalCode" },
          ].map(({ label, key, type = "text" }) => (
            <div className="form-control" key={key}>
              <label className="label font-semibold text-gray-600">
                {label}
              </label>
              <input
                type={type}
                className="input input-bordered w-full"
                value={user[key] || ""}
                disabled={!isEditing}
                onChange={(e) => setUser({ ...user, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        {/* ฟอร์มเปลี่ยนรหัสผ่าน */}
        {isEditing && (
          <div className="mt-6">
            <label className="label font-semibold text-gray-600">
              รหัสผ่านใหม่
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <p
                className={`${
                  passwordValid ? "text-green-500" : "text-red-500"
                } text-sm mt-1`}
              >
                {passwordError}
              </p>
            )}

            <label className="label font-semibold text-gray-600 mt-2">
              ยืนยันรหัสผ่าน
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className="btn btn-danger w-full mt-4"
              onClick={handleChangePassword}
            >
              ตรวจสอบข้อมูล
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
