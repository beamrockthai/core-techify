import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { registerJob } from "../api/registerJob";

const JobApplicationForm = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const [formData, setFormData] = useState({
    jobId: "",
    profileImage: null,
    attachedFiles: null,
    personalInfo: "",
    educationHistory: "",
    workHistory: "",
    specialSkills: "",
  });

  // ✅ ใช้ useEffect อัปเดต jobId เมื่อ URL เปลี่ยน
  useEffect(() => {
    if (jobId) {
      setFormData((prevState) => ({
        ...prevState,
        jobId: jobId,
      }));
    }
  }, [jobId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📌 Checking jobId before sending:", formData.jobId);

    if (!formData.jobId) {
      console.error("❌ jobId is missing!");
      return;
    }

    try {
      console.log("📌 Sending data to API:", formData);
      const response = await registerJob(formData);
      console.log("✅ API Response:", response);
      navigate("/success");
    } catch (error) {
      console.error(
        "❌ Error submitting job application:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg max-w-lg mx-auto"
      >
        <h2 className="text-xl font-bold mb-4 text-center">สมัครงาน</h2>

        <p className="mb-4 text-gray-600 text-center">
          สมัครงานสำหรับตำแหน่ง: <b>{formData.jobId || "กำลังโหลด..."}</b>
        </p>

        <label className="block mb-2">
          รูปโปรไฟล์:
          <input
            type="file"
            name="profileImage"
            onChange={handleFileChange}
            className="file-input w-full"
          />
        </label>

        <label className="block mb-2">
          ข้อมูลส่วนตัว:
          <input
            type="text"
            name="personalInfo"
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>

        <label className="block mb-2">
          ประวัติการศึกษา:
          <input
            type="text"
            name="educationHistory"
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>

        <label className="block mb-2">
          ประวัติการทำงาน:
          <input
            type="text"
            name="workHistory"
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>

        <label className="block mb-2">
          ความสามารถพิเศษ:
          <textarea
            name="specialSkills"
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </label>

        <button type="submit" className="btn btn-primary w-full">
          ส่งใบสมัคร
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
