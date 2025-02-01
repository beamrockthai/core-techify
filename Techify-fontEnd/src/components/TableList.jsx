export default function TableList() {
  // data
  const job = [
    {
      id: 1,
      JobName: "Backend",
      Description: "สําหรับเทส",
      Location: "Bangkok",
      isactive: true,
    },
    {
      id: 2,
      JobName: "Frontend",
      Description: "สําหรับเทส1",
      Location: "Bangkok1",
      isactive: true,
    },
    {
      id: 3,
      JobName: "Fullstack",
      Description: "สําหรับเทส2",
      Location: "Bangkok2",
      isactive: false,
    },
  ];
  return (
    <>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>งาน</th>
              <th>รายละเอียด</th>
              <th>สถานะ</th>
            </tr>
          </thead>

          <tbody className="hover">
            {/* map function ไว้เรียกข้อมูลจากตัวแปร job */}
            {/* row 1 */}

            {job.map((job) => (
              <tr>
                <th>{job.id}</th>
                <td>{job.JobName}</td>
                <td>{job.Description}</td>
                <td>
                  <button
                    className={`btn rounded-full w-20 ${
                      job.isactive ? "btn-primary" : "btn-outline-primary"
                    }`}
                  >
                    {job.isactive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <button className="btn btn-secondary">Update</button>
                </td>
                <td>
                  <button className="btn btn-accent">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
