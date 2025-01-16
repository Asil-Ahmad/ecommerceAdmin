import React from "react";
import Slider from "../../constant/Slider";

const Carousel = () => {
  return (
    <div className=''>
      <div className='p-4 m-2 border-dashed hover:border-gray-400 transition-all duration-300 border-2'>
        <Slider />
      </div>
    </div>
  );
};

export default Carousel;
