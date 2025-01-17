import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "../../constant/Slider";

const Carousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const fetchCarousel = async () => {
    try {
      const response = await axios("http://localhost:4000/api/layout/get-carousel");
      const { images } = response.data.carousel[0];
      console.log(images);
      setCarouselImages(images);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarousel();
  }, []);
  return (
    <div className=''>
      <div className='p-4 m-2 border-dashed hover:border-gray-400 transition-all duration-300 border-2'>
        {/* todo Slider */}
        <Slider carouselImages={carouselImages} />
      </div>
      <div></div>
    </div>
  );
};

export default Carousel;
