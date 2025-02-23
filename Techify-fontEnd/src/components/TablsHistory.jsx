import React from "react";
import { generatePDF } from "../utils/pdf/ExportPDF"; // ✅ Import ฟังก์ชันสร้าง PDF

const TableHistory = ({ data }) => {
  console.log("📌 TableHistory received data:", data); // ✅ Debug Data

  if (!Array.isArray(data)) {
    console.error("❌ data is not an array:", data);
    return (
      <p className="text-center text-red-500">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
    );
  }

  return (
    <div className="overflow-auto rounded-lg shadow-lg">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-4 py-3 text-left">ชื่องาน</th>
            <th className="px-4 py-3 text-left">วันที่สมัคร</th>
            <th className="px-4 py-3 text-left">สถานะ</th>
            <th className="px-4 py-3 text-left">Download</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                ไม่มีประวัติการสมัคร
              </td>
            </tr>
          ) : (
            data.map((job, index) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  {job.Job?.JobName || "ไม่พบข้อมูล"} {/* ✅ คงชื่องานไว้ */}
                </td>
                <td className="px-4 py-3">
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      job.status === "accepted"
                        ? "bg-green-500 text-white"
                        : job.status === "rejected"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {job.status === "accepted"
                      ? "ได้รับการตอบรับ"
                      : job.status === "rejected"
                      ? "ถูกปฏิเสธ"
                      : "รอการตรวจสอบ"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => generatePDF([job])} // ✅ ใช้งานฟังก์ชัน PDF
                    className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableHistory;
