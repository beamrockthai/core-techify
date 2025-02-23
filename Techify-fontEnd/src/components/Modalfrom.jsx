import { useEffect, useState } from "react";

export default function ModalForm({
  isOpen,
  onSubmit,
  mode,
  onClose,
  jobData,
}) {
  const [JobName, setJobName] = useState("");
  const [Description, setDescription] = useState("");
  const [Location, setLocation] = useState("");
  const [status, setStatus] = useState(false);

  // ฟังก์ชันเปลี่ยนค่า Status
  const handleChangeStatus = (e) => {
    setStatus(e.target.value === "เปิดรับสมัคร");
  };

  // ฟังก์ชันส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jobData = { JobName, Description, Location, IsActive: status };
      await onSubmit(jobData);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  // ดึงข้อมูลสำหรับแก้ไข
  useEffect(() => {
    if (mode === "edit" && jobData) {
      setJobName(jobData.JobName);
      setDescription(jobData.Description);
      setLocation(jobData.Location);
      setStatus(jobData.IsActive);
    } else {
      setJobName("");
      setDescription("");
      setLocation("");
      setStatus(false);
    }
  }, [mode, jobData]);

  return (
    <>
      <dialog id="my_modal" className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box max-w-4xl p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
          <h3 className="font-bold text-lg text-gray-700 dark:text-white">
            {mode === "edit" ? "แก้ไขการประกาศงาน" : "ประกาศงานใหม่"}
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              {/* ชื่องาน */}
              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  ชื่องาน
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-300"
                  value={JobName}
                  onChange={(e) => setJobName(e.target.value)}
                  required
                />
              </div>

              {/* รายละเอียด */}
              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  รายละเอียด
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-300"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* ที่อยู่ */}
              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  ที่อยู่
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-300"
                  value={Location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              {/* สถานะงาน */}
              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  สถานะการรับสมัคร
                </label>
                <select
                  value={status ? "เปิดรับสมัคร" : "ปิดรับสมัคร"}
                  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-300"
                  onChange={handleChangeStatus}
                >
                  <option>ปิดรับสมัคร</option>
                  <option>เปิดรับสมัคร</option>
                </select>
              </div>
            </div>

            {/* ปุ่มส่งฟอร์ม & ปิด */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="px-5 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={onClose}
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="ml-3 px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                {mode === "edit" ? "บันทึก" : "ประกาศงาน"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
