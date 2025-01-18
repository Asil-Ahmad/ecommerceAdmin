import React, { useState } from "react";
import axios from "axios";

const Carousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  //todo Get carousel images
  const fetchCarousel = async () => {
    try {
      const response = await axios("http://localhost:4000/api/layout/get-carousel");
      const { carousel } = response.data;
      // console.log(carousel);
      setCarouselImages(carousel);
    } catch (error) {
      console.log(error);
    }
  };
  return <div>Carousel</div>;
};

export default Carousel;
