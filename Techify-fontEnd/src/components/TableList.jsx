import { useState } from "react";
import { deleteJob } from "../api/jobApi";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import Framer Motion
import Alerts from "./Alerts"; // ✅ Import Alerts Component

export default function TableList({ handleOpen, tableData, setTableData }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      try {
        await deleteJob(deleteId);
        setTableData((prev) => prev.filter((job) => job.id !== deleteId));

        // ✅ แสดงแจ้งเตือนแบบสมูท
        setAlertMessage("ลบข้อมูลสำเร็จ!");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } catch (error) {
        console.error("Error deleting job:", error);
      }
      setDeleteId(null);
    }
  };

  return (
    <section className="container mx-auto max-w-6xl px-6 lg:px-12 py-8">
      {/* ✅ Alert แจ้งเตือนแบบสมูท */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alerts message={alertMessage} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              รายการงานที่ประกาศ
            </h2>
            <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {tableData.length} งาน
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            รายชื่องานในระบบทั้งหมด
          </p>
        </div>

        {/* ปุ่มประกาศงาน */}
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => handleOpen("add")}
            className="flex items-center px-5 py-2 text-sm font-medium text-white transition bg-blue-500 rounded-lg gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>ประกาศงาน</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6 overflow-auto rounded-lg shadow-md">
        <table className="w-full min-w-[850px]  divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {[
                "#",
                "งาน",
                "รายละเอียด",
                "ที่อยู่",
                "คุณสมบัติ",
                "ระยะเวลา",
                "อัตราตอบเเทน",
                "สถานะ",
                "อัปเดท",
                "ลบ",
              ].map((title) => (
                <th
                  key={title}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {tableData.map((job, index) => (
              <tr key={job.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 text-sm">{index + 1}</td>

                {/* ✅ ตัวอย่างการใส่ Utility Class เพื่อรองรับข้อความยาวๆ (Responsive) */}
                <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white break-words whitespace-normal max-w-[200px]">
                  {job.JobName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 break-words whitespace-normal max-w-[300px]">
                  {job.Description}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 break-words whitespace-normal max-w-[300px]">
                  {job.Location}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 break-words whitespace-normal max-w-[300px]">
                  {job.Respon}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 break-words whitespace-normal max-w-[300px]">
                  {job.Period}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 break-words whitespace-normal max-w-[300px]">
                  {job.Ror}
                </td>

               

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      job.IsActive
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {job.IsActive ? "เปิด" : "ปิด"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleOpen("edit", job)}
                    className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition"
                  >
                    แก้ไข
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setDeleteId(job.id)}
                    className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Popup Confirm Modal แบบสมูท */}
      <AnimatePresence>
        {deleteId && (
          <motion.dialog
            open
            className="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">ยืนยันการลบ</h3>
              <p className="py-4">คุณแน่ใจหรือไม่ว่าต้องการลบงานนี้?</p>
              <div className="modal-action">
                <button onClick={() => setDeleteId(null)} className="btn">
                  ยกเลิก
                </button>
                <button onClick={handleDeleteConfirm} className="btn btn-error">
                  ลบ
                </button>
              </div>
            </div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
