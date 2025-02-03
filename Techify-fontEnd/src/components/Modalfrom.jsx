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
  // const [rate, setRate] = useState("");
  const [status, setStatus] = useState(false);

  //Handle Change
  const handleChange = (e) => {
    setStatus(e.target.value === "Active");
  };

  //Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jobData = { JobName, Description, Location, IsActive: status };
      await onSubmit(jobData);
      onClose();
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  // เเก้ไขข้อมูล
  useEffect(() => {
    if (mode === "edit") {
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
      <dialog id="my_modal" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "เเก้ไขการประกาศงาน" : "Job Details"}
          </h3>
          <form method="dialog" onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              ชื่องาน
              <input
                type="text"
                className="grow"
                value={JobName}
                onChange={(e) => setJobName(e.target.value)}
              />
            </label>

            <br></br>
            <label className="input input-bordered flex items-center gap-2">
              รายละเอียด
              <input
                type="text"
                className="grow"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <br></br>
            <label className="input input-bordered flex items-center gap-2">
              ที่อยู่
              <input
                type="text"
                className="grow"
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <br></br>

            <div className="flex mb-4" justify="between">
              {/* <label className="input input-bordered mr-4 flex items-center gap-2">
                เรท
                <input
                  type="number"
                  className="grow"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </label> */}
              <select
                value={status ? "เปิดรับสมัคร" : "ปิดรับสมัคร"}
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => setStatus(e.target.value === "เปิดรับสมัคร")}
              >
                <option>ปิดรับสมัคร</option>
                <option>เปิดรับสมัคร</option>
              </select>
            </div>
            {/* ปุ่มปิด Modal */}
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
            <button type="submit" className="btn btn-success">
              {mode === "edit" ? "บันทึก" : "ประกาศงาน"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
