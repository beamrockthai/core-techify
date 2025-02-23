import { useState, useEffect } from "react";
import TableList from "../components/TableList";
import ModalForm from "../components/Modalfrom";
// import Banner from "../components/Banner";
import { getJobs, addJob, updateJob } from "../api/jobApi";

const JobPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [jobData, setJobData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  // ดึงข้อมูลงานจาก API
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const jobs = await getJobs();
      setTableData(jobs);
    } catch (error) {
      setError("ไม่สามารถโหลดข้อมูลงานได้");
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // เปิด Modal
  const handleOpen = (mode, job = null) => {
    setJobData(job || {});
    setModalMode(mode);
    setIsOpen(true);
  };

  // เพิ่มหรือแก้ไขข้อมูลงาน
  const handleSubmit = async (newJobData) => {
    try {
      if (modalMode === "add") {
        const newJob = await addJob(newJobData);
        setTableData([...tableData, newJob]);
      } else if (modalMode === "edit") {
        const updatedJob = await updateJob(jobData.id, newJobData);
        setTableData(
          tableData.map((job) => (job.id === jobData.id ? updatedJob : job))
        );
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting job:", error);
      setError("ไม่สามารถบันทึกข้อมูลงานได้");
    }
  };

  return (
    <div>
      {/* <h1 className="text-2xl font-bold text-center my-4">จัดการงาน</h1> */}
      {loading && <p className="text-center text-gray-500">กำลังโหลด...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <TableList
        tableData={tableData}
        setTableData={setTableData} // ส่ง setTableData
        handleOpen={handleOpen}
      />
      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        jobData={jobData}
      />
      {/* <div className="mt-12 w-screen px-15">
        <Banner />
      </div> */}
    </div>
  );
};

export default JobPage;
