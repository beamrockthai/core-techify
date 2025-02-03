import { useState } from "react";
import { deleteJob } from "../api/jobApi"; // นำเข้า API service

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
    <>
      {error && <div className="text-red-500">{error}</div>}

      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>งาน</th>
              <th>รายละเอียด</th>
              <th>ที่อยู่</th>
              <th>สถานะ</th>
              <th>อัปเดทข้อมูล</th>
              <th>ลบข้อมูล</th>
            </tr>
          </thead>

          <tbody className="hover">
            {tableData.map((job) => (
              <tr key={job.id}>
                <th>{job.id}</th>
                <td>{job.JobName}</td>
                <td>{job.Description}</td>
                <td>{job.Location}</td>
                <td>{job.IsActive}</td>

                <td>
                  <button
                    className={`btn rounded-full w-20 ${
                      job.IsActive ? "btn-primary" : "btn-outline-primary"
                    }`}
                  >
                    {job.IsActive ? "เปิด" : "ปิด"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleOpen("edit", job)}
                    className="btn btn-secondary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="btn btn-accent"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
