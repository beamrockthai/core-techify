import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // ใช้ Autoplay Module
import { getJobs } from "../api/jobApi";
import Banner from "../components/Banner";

import "swiper/css";
import "swiper/css/autoplay";
import { registerJob } from "../api/registerJob";

// ✅ นำเข้าภาพจากโฟลเดอร์ assets
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";

const images = [image1, image2, image3, image4];

const ImageCarousel = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    registerJob();
    const fetchJobs = async () => {
      try {
        const jobs = await getJobs();
        setTableData(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-white w-full flex flex-col items-center">
      {/* ✅ ใช้ DaisyUI + Swiper และทำให้เต็มจอ */}
      <div className="carousel w-screen rounded-none shadow-xl overflow-hidden">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000, // หน่วงเวลา 3 วินาที
            disableOnInteraction: false,
          }}
          speed={2000} // ✅ ปรับให้การเปลี่ยนภาพสมูทขึ้น
          modules={[Autoplay]}
          className="w-screen h-[600px]"
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
      </div>

      {/* ✅ ปุ่ม ข่าวสารการเปิดรับสมัคร */}
      <div className="w-full mt-6 flex justify-start px-6">
        <button className="btn btn-primary text-white px-6 py-2 text-lg rounded-lg shadow-lg">
          ข่าวสารการเปิดรับสมัคร
        </button>
      </div>

      {/* ✅ รายการงานที่เปิดรับ */}
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

      {/* ✅ Banner อยู่ล่างสุด (เพิ่มระยะห่าง & ขยายขนาด) */}
      <div className="mt-12 w-screen px-15 ">
        <Banner />
      </div>
    </div>
  );
};

export default ImageCarousel;
