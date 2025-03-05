import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion"; // ✅ ใช้ Framer Motion
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Grid } from "swiper/modules";
import { getJobs } from "../api/jobApi";
import Banner from "../components/Banner";
import JobCard from "../components/JobCard";
import MockupCard from "../components/MockupCard";
import VideoBanner from "../components/VideoBanner";
import Awesome from "../components/Awesome";
import Faq from "../components/Faq";
import { registerJob } from "../api/registerJob";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/grid";

// ✅ Smooth Scroll
const HomeMain = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const controls = useAnimation();
  const mainRef = useRef(null);

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
    <motion.div
      ref={mainRef}
      className="bg-white w-full flex flex-col items-center overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* ✅ ใช้ VideoBanner */}
      <VideoBanner />

      {/* ✅ Smooth Scroll Section */}
      <motion.div
        className="w-full flex flex-col items-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* ✅ ปุ่มข่าวสาร */}
        <motion.div
          className="w-full mt-6 flex justify-start px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <button className="btn btn-primary text-white px-6 py-2 text-lg rounded-lg shadow-lg">
            ข่าวสารการเปิดรับสมัคร
          </button>
        </motion.div>

        {/* ✅ Swiper สำหรับ JobCard */}
        <motion.div
          className="w-full px-6 mt-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {error ? (
            <p className="text-red-500 text-center">เกิดข้อผิดพลาด: {error}</p>
          ) : jobs.length > 0 ? (
            <Swiper
              spaceBetween={20}
              slidesPerView={1} // ✅ ให้เลื่อนไปด้านข้าง
              centeredSlides={false}
              breakpoints={{
                640: { slidesPerView: 1.5 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation, Autoplay]}
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
        </motion.div>

        {/* ✅ MockupCard */}
        <motion.div
          className="mt-12 w-screen px-15"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <MockupCard />
        </motion.div>

        {/* ✅ Awesome */}
        <motion.div
          className="mt-12 w-screen px-15"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Awesome />
        </motion.div>

        {/* ✅ FAQ */}
        <motion.div
          className="mt-12 w-screen px-15"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Faq />
        </motion.div>

        {/* ✅ Banner */}
        <div className="mt-12 w-screen px-15">
          <Banner />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomeMain;
