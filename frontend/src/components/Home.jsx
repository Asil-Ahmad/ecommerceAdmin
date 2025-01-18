import React from "react";
import Homepage from "../layout/Homepage";
import Slider from "../constant/Slider";
import Carousel from "../layout/Carousel";
import Marquee from "../layout/Marquee";

const Home = () => {
  return (
    <div className='flex flex-col gap-5 pb-5'>
      <Homepage />
      <Carousel />
      <Marquee />
    </div>
  );
};

export default Home;
