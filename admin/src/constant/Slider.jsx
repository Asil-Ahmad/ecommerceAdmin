import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slider = ({ carouselImages }) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper  max-w-[1060px] h-[250px]'
      >
        {carouselImages.map((img) => (
          <SwiperSlide className="select-none">
            <Link to={img.link} key={img._id}>
              <img src={img.url} alt='' className='object-cover w-full' />
              {console.log(img._id)}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default Slider;
