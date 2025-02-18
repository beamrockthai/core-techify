import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getJobs } from "../api/jobApi";
import "swiper/css";

const ImageCarousel = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  const images = [
    "/src/assets/image1.jpg",
    "/src/assets/image2.jpg",
    "/src/assets/image3.jpg",
    "/src/assets/image4.jpg",
  ];

  useEffect(() => {
    const AllJobs = async () => {
      try {
        const jobs = await getJobs();
        setTableData(jobs); // อัปเดต state ของ tableData
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message);
      }
    };

    AllJobs();
  }, []);

  return (
    <div className="bg-white w-full flex flex-col items-center">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        className="w-full max-w-10xl h-[500px] rounded-md overflow-hidden shadow-md"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Button Section */}
      <div className="w-full mt-6 flex justify-start">
        <button className="btn btn-primary text-white px-6 py-2 text-lg rounded-lg shadow-lg ml-6">
          ข่าวสารการเปิดรับสมัคร
        </button>
      </div>

      {/*<div className="w-full mt-6 flex justify-start">
        <button className="btn btn-primary text-white px-6 py-2 text-lg rounded-lg shadow-lg ml-6">
          ตําเเหน่งงานที่เปิดรับ
        </button>
      </div>*/}

      <div className="w-full px-6">
        {error ? (
          <p className="text-red-500">เกิดข้อผิดพลาด: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {tableData.length > 0 ? (
              tableData.map((job, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-lg rounded-xl p-4"
                >
                  <div className="flex justify-between items-center">
                    {/* Job Title + NEW! Badge */}
                    <div className="flex items-center">
                      {job.IsNew && (
                        <span className="badge badge-primary mr-2">NEW!</span>
                      )}
                      <h3 className="text-lg font-semibold">{job.JobName}</h3>
                    </div>
                    {/* Status */}
                    <span
                      className={`badge ${
                        job.IsActive ? "badge-success" : "badge-error"
                      } text-white text-sm px-3 py-1`}
                    >
                      {job.IsActive ? "เปิดรับสมัคร" : "ปิดรับสมัคร"}
                    </span>
                  </div>

                  {/* Job Details */}
                  <p className="text-gray-600 mt-2">{job.Description}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    📍 ที่อยู่:{" "}
                    <span className="font-medium">{job.Location}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">ไม่พบข้อมูล</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
