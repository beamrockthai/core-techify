import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import ModalForm from "./components/Modalfrom";
import { getJobs, addJob, updateJob } from "../src/api/jobApi"; // นำเข้า API service

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [jobData, setJobData] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  // ดึงข้อมูลงาน
  const fetchJobs = async () => {
    try {
      const jobs = await getJobs();
      setTableData(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // เปิด Modal
  const handleOpen = (mode, job) => {
    setJobData(job || {});
    setModalMode(mode);
    setIsOpen(true);
  };

  // เพิ่มหรือแก้ไขข้อมูล
  const handleSubmit = async (newJobData) => {
    try {
      if (modalMode === "add") {
        const newJob = await addJob(newJobData);
        setTableData((prevData) => [...prevData, newJob]);
      } else if (modalMode === "edit" && jobData) {
        const updatedJob = await updateJob(jobData.id, newJobData);
        setTableData((prevData) =>
          prevData.map((job) => (job.id === jobData.id ? updatedJob : job))
        );
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting job:", error);
    }
  };

  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} />
      <TableList
        tableData={tableData}
        setTableData={setTableData}
        handleOpen={handleOpen}
      />
      <ModalForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        jobData={jobData}
      />
    </>
  );
}

export default App;
