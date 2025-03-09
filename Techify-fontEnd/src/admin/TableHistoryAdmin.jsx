import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // ✅ ใช้ SweetAlert2
import { getAllRegisterJobs, updateApplicationStatus } from "../api/adminApi"; // ✅ ใช้ API ของ Admin
import { downloadPDF } from "../api/ExportPdf"; // ✅ ใช้ API ดาวน์โหลด PDF

const TableHistoryAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ ดึงข้อมูลการสมัครงานทั้งหมด
  const fetchApplications = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const data = await getAllRegisterJobs(token);
      setApplications(data.data);
    } catch (error) {
      console.error("❌ ไม่สามารถโหลดข้อมูลใบสมัครได้:", error);
      Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถโหลดข้อมูลใบสมัครได้", "error");
    }
    setLoading(false);
  };

  // ✅ โหลดข้อมูลเมื่อเปิดหน้า
  useEffect(() => {
    fetchApplications();
  }, []);

  // ✅ อัปเดตสถานะการสมัคร (ยกเลิก / อนุมัติ / ปฏิเสธ)
  const handleUpdateStatus = async (applicationId, newStatus) => {
    const token = localStorage.getItem("token");

    Swal.fire({
      title: "ยืนยันการเปลี่ยนสถานะ?",
      text: `คุณต้องการเปลี่ยนเป็น "${newStatus}" หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, เปลี่ยน!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateApplicationStatus(applicationId, newStatus, token);
          Swal.fire("สำเร็จ!", "สถานะได้รับการอัปเดต", "success");
          fetchApplications(); // ✅ โหลดข้อมูลใหม่
        } catch (error) {
          Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถอัปเดตสถานะได้", "error");
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
      {loading ? (
        <p className="text-center text-gray-500 py-4">⏳ กำลังโหลดข้อมูล...</p>
      ) : (
        <table className="table table-auto w-full text-xs md:text-sm lg:text-base">
          <thead className="bg-base-200">
            <tr>
              <th className="px-2 md:px-4 py-3">#</th>
              <th className="px-2 md:px-4 py-3">ชื่อผู้สมัคร</th>
              <th className="px-2 md:px-4 py-3">ชื่องาน</th>
              <th className="px-2 md:px-4 py-3">วันที่สมัคร</th>
              <th className="px-2 md:px-4 py-3">สถานะ</th>
              <th className="px-2 md:px-4 py-3 text-center">Download</th>
              <th className="px-2 md:px-4 py-3 text-center">อัปเดตสถานะ</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 font-semibold text-error"
                >
                  ❌ ไม่มีข้อมูลใบสมัคร
                </td>
              </tr>
            ) : (
              applications.map((job, index) => (
                <tr key={job.id} className="hover:bg-base-100">
                  <td className="px-2 md:px-4 py-3">{index + 1}</td>
                  <td className="px-2 md:px-4 py-3">
                    {job.User?.firstName} {job.User?.lastName}
                  </td>
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
                      onClick={() => downloadPDF(job)}
                      className="btn btn-primary btn-xs md:btn-sm lg:btn-md w-full md:w-auto"
                    >
                      Download
                    </button>
                  </td>
                  <td className="px-2 md:px-4 py-3 text-center">
                    <select
                      className="select select-bordered select-sm w-full md:w-auto"
                      value={job.status}
                      onChange={(e) =>
                        handleUpdateStatus(job.id, e.target.value)
                      }
                    >
                      <option value="pending">รอการตรวจสอบ</option>
                      <option value="accepted">ตรวจสอบเเล้ว</option>
                      <option value="rejected">ถูกปฏิเสธ</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableHistoryAdmin;
