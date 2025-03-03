import React from "react";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import { generatePDF } from "../utils/pdf/ExportPDF";
import { cancelRegisterJob } from "../api/registerJob";

const TableHistory = ({ data, refreshData }) => {
  console.log("📌 TableHistory received data:", data);

  if (!Array.isArray(data)) {
    console.error("❌ data is not an array:", data);
    return (
      <p className="text-center text-red-500">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
    );
  }

  const handleCancel = async (applicationId) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการยกเลิกการสมัครงานนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ยกเลิก!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await cancelRegisterJob(applicationId);
          Swal.fire("สำเร็จ!", response.message, "success");
          refreshData(); // ✅ โหลดข้อมูลใหม่หลังจากยกเลิก
        } catch (error) {
          Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถยกเลิกการสมัครได้", "error");
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg font-semibold">
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">#</th>
            <th className="px-4 py-3 text-left font-semibold">ชื่องาน</th>
            <th className="px-4 py-3 text-left font-semibold">วันที่สมัคร</th>
            <th className="px-4 py-3 text-left font-semibold">สถานะ</th>
            <th className="px-4 py-3 text-left font-semibold">Download</th>
            <th className="px-4 py-3 text-left font-semibold">ยกเลิก</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 font-semibold">
                ไม่มีประวัติการสมัคร
              </td>
            </tr>
          ) : (
            data.map((job, index) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  {job.Job?.JobName || "ไม่พบข้อมูล"}
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
                    onClick={() => generatePDF([job])}
                    className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition font-semibold"
                  >
                    Download
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleCancel(job.id)}
                    className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition font-semibold"
                  >
                    ยกเลิก
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
