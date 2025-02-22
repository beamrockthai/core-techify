import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Grid } from "swiper/modules"; // ✅ ใช้ Grid module
import { getJobs } from "../api/jobApi";
import Banner from "../components/Banner";
import JobCard from "../components/JobCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/grid";
import { registerJob } from "../api/registerJob";

// ✅ นำเข้าภาพจากโฟลเดอร์ assets ที่อยู่ใน `src/assets`
// import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";

const images = [image2, image3, image4];

const HomeMain = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    registerJob();
    const fetchJobs = async () => {
      try {
        const jobList = await getJobs();
        console.log("🚀 ข้อมูลจาก API:", jobList);
        setJobs(jobList);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-white w-full flex flex-col items-center">
      {/* ✅ Swiper สำหรับภาพแบนเนอร์ */}
      <div className="carousel w-screen rounded-none shadow-xl overflow-hidden">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={2000}
          modules={[Autoplay]}
          className="w-screen h-[600px]"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src} // ✅ ใช้ import เพื่อให้ React โหลดไฟล์
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ ปุ่มข่าวสาร */}
      <div className="w-full mt-6 flex justify-start px-6">
        <button className="btn btn-primary text-white px-6 py-2 text-lg rounded-lg shadow-lg">
          ข่าวสารการเปิดรับสมัคร
        </button>
      </div>

      {/* ✅ Swiper สำหรับ JobCard (2 แถว x 4 การ์ดต่อแถว) */}
      <div className="w-full px-6 mt-4">
        {error ? (
          <p className="text-red-500 text-center">เกิดข้อผิดพลาด: {error}</p>
        ) : jobs.length > 0 ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={2} // เริ่มต้นที่ 2 การ์ดต่อแถว
            grid={{ rows: 2, fill: "row" }} // ✅ กำหนด 2 แถว
            breakpoints={{
              640: { slidesPerView: 2, grid: { rows: 2 } }, // มือถือ
              768: { slidesPerView: 3, grid: { rows: 2 } }, // แท็บเล็ต
              1024: { slidesPerView: 4, grid: { rows: 2 } }, // เดสก์ท็อป
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation, Grid]}
            className="w-full pb-10"
          >
            {jobs.map((job) => (
              <SwiperSlide key={job.id} className="flex justify-center">
                <JobCard job={job} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-500 text-center">ไม่พบข้อมูล</p>
        )}
      </div>

      {/* ✅ Banner อยู่ล่างสุด */}
      <div className="mt-12 w-screen px-15 ">
        <Banner />
      </div>
    </div>
  );
};

export default HomeMain;
