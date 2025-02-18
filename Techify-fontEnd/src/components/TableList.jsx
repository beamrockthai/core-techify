import { useState } from "react";
import { deleteJob } from "../api/jobApi";

export default function TableList({ handleOpen, tableData, setTableData }) {
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
    if (confirmDelete) {
      try {
        await deleteJob(id);
        setTableData((prev) => prev.filter((job) => job.id !== id));
      } catch (error) {
        console.error("Error deleting job:", error);
        setError(error.message);
      }
    }
  };

  return (
    <div className="p-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* ปุ่มประกาศงาน */}
      <div className="flex justify-start mb-4">
        <button
          onClick={() => handleOpen("add")}
          className="btn btn-primary rounded-lg shadow-md px-6 py-2"
        >
          ประกาศงาน
        </button>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>งาน</th>
              <th>รายละเอียด</th>
              <th>ที่อยู่</th>
              <th>สถานะ</th>
              <th>อัปเดทข้อมูล</th>
              <th>ลบข้อมูล</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((job, index) => (
              <tr key={job.id} className="hover:bg-gray-100">
                <th>{index + 1}</th>
                <td>{job.JobName}</td>
                <td>{job.Description}</td>
                <td>{job.Location}</td>
                <td>
                  <button
                    className={`btn btn-sm rounded-full w-20 ${
                      job.IsActive ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {job.IsActive ? "เปิด" : "ปิด"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleOpen("edit", job)}
                    className="btn btn-secondary btn-sm"
                  >
                    แก้ไข
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="btn btn-error btn-sm"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
