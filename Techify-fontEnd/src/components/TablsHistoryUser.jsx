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
    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
      <table className="table table-auto w-full text-xs md:text-sm lg:text-base">
        <thead className="bg-base-200">
          <tr>
            <th className="px-2 md:px-4 py-3">#</th>
            <th className="px-2 md:px-4 py-3">ชื่องาน</th>
            <th className="px-2 md:px-4 py-3">วันที่สมัคร</th>
            <th className="px-2 md:px-4 py-3">สถานะ</th>
            <th className="px-2 md:px-4 py-3 text-center">Download</th>
            <th className="px-2 md:px-4 py-3 text-center">ยกเลิก</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-4 font-semibold text-error"
              >
                ไม่มีประวัติการสมัคร
              </td>
            </tr>
          ) : (
            data.map((job, index) => (
              <tr key={job.id} className="hover:bg-base-100">
                <td className="px-2 md:px-4 py-3">{index + 1}</td>
                <td className="px-2 md:px-4 py-3">
                  {job.Job?.JobName || "ไม่พบข้อมูล"}
                </td>
                <td className="px-2 md:px-4 py-3">
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-2 md:px-4 py-3">
                  <span
                    className={`badge badge-sm md:badge-md text-white ${
                      job.status === "accepted"
                        ? "badge-success"
                        : job.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {job.status === "accepted"
                      ? "ได้รับการตอบรับ"
                      : job.status === "rejected"
                      ? "ถูกปฏิเสธ"
                      : "รอการตรวจสอบ"}
                  </span>
                </td>
                <td className="px-2 md:px-4 py-3 text-center">
                  <button
                    onClick={() => generatePDF([job])}
                    className="btn btn-primary btn-xs md:btn-sm lg:btn-md w-full md:w-auto"
                  >
                    Download
                  </button>
                </td>
                <td className="px-2 md:px-4 py-3 text-center">
                  <button
                    onClick={() => handleCancel(job.id)}
                    className="btn btn-error btn-xs md:btn-sm lg:btn-md w-full md:w-auto"
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
