import { useEffect, useState } from "react";
import { getUserProfile } from "../api/userApi";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data || {}); // 🔹 ป้องกัน `user` เป็น `null`
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading)
    return (
      <p className="text-center text-lg text-gray-700">กำลังโหลดข้อมูล...</p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user)
    return <p className="text-center text-gray-500">ไม่มีข้อมูลผู้ใช้</p>;

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-200 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          ข้อมูลส่วนตัว
        </h2>
        <p className="text-red-500 text-sm text-center mb-4">
          กรุณาตรวจสอบ ชื่อ นามสกุล ให้ตรงตามบัตรประชาชน
        </p>

        <div className="border-t border-purple-500 mb-4"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label font-semibold text-gray-600">
              ชื่อ - นามสกุล
            </label>
            <input
              type="text"
              value={`${user.firstName || ""} ${user.lastName || ""}`} // 🔹 แก้ไขให้ปลอดภัย
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-gray-600">
              เลขบัตรประชาชน
            </label>
            <input
              type="text"
              value={user.nationalId ? user.nationalId.slice() : ""} // 🔹 เช็ค `null` ก่อนใช้ `.slice()`
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-gray-600">
              วันเดือนปีเกิด
            </label>
            <input
              type="text"
              value={user.birhDate || "ไม่ระบุ"} // 🔹 ป้องกันค่า `undefined`
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-gray-600">E-mail</label>
            <input
              type="email"
              value={user.email || "ไม่ระบุ"}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-gray-600">
              เบอร์โทรศัพท์
            </label>
            <input
              type="text"
              value={user.phoneNumber || "ไม่ระบุ"}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="border-t border-purple-500 mt-6"></div>

        <h3 className="text-lg font-semibold text-gray-800 mt-4">ที่อยู่</h3>

        <div className="grid grid-cols-1 gap-4 mt-2">
          <div className="form-control">
            <label className="label font-semibold text-gray-600">
              บ้านเลขที่
            </label>
            <input
              type="text"
              value={user.houseNumber || "ไม่ระบุ"}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="form-control">
              <label className="label font-semibold text-gray-600">
                หมู่ที่
              </label>
              <input
                type="text"
                value={user.village || "ไม่ระบุ"}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold text-gray-600">
                ซอย/ถนน
              </label>
              <input
                type="text"
                value={user.district || "ไม่ระบุ"}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold text-gray-600">ตำบล</label>
              <input
                type="text"
                value={user.subDistrict || "ไม่ระบุ"}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold text-gray-600">อำเภอ</label>
              <input
                type="text"
                value={user.district || "ไม่ระบุ"}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-semibold text-gray-600">
                จังหวัด
              </label>
              <input
                type="text"
                value={user.province || "ไม่ระบุ"}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold text-gray-600">
                ไปรษณีย์
              </label>
              <input
                type="text"
                value={user.postalCode || "ไม่ระบุ"}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
