import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ImageCarousel = () => {
  const images = [
    "/src/assets/image1.jpg",
    "/src/assets/image2.jpg",
    "/src/assets/image3.jpg",
    "/src/assets/image4.jpg",
  ];

  return (
    <div className="bg-white w-full flex flex-col items-center">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        className="w-full max-w-10xl h-[600px] rounded-md overflow-hidden shadow-md"
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
    </div>
  );
};

export default ImageCarousel;
