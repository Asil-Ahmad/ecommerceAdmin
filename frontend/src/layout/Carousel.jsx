import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "../constant/Slider";

const Carousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  //todo Get carousel images
  const fetchCarousel = async () => {
    try {
      const response = await axios("http://localhost:4000/api/layout/get-carousel");
      const { carousel } = response.data;
      console.log("Data", carousel);
      setCarouselImages(carousel);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarousel();
  }, []);
  return <Slider carouselImages={carouselImages} />;
};

export default Carousel;
