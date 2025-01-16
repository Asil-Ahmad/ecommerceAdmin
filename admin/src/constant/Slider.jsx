import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper  max-w-[1060px] h-[250px]'
      >
        <SwiperSlide className="bg-red-700">Slide 1</SwiperSlide>
        <SwiperSlide className="bg-blue-700">Slide 2</SwiperSlide>
        <SwiperSlide className="bg-green-700">Slide 3</SwiperSlide>
        <SwiperSlide className="bg-yellow-700">Slide 4</SwiperSlide>
      </Swiper>
    </>
  );
};
export default Slider;
