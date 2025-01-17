import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "../../constant/Slider";
import { Typography, Input } from "@material-tailwind/react";

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
    <div className='container mx-auto'>
      <div className='p-4 m-2 border-dashed hover:border-gray-400 transition-all duration-300 border-2'>
        {/* Slider */}
        <Slider carouselImages={carouselImages} />
      </div>
      {/* Slider Slides Preview */}
      <Typography variant='h6' color='blue-gray' className=' px-4'>
        {" "}
        Carousel Slides Preview
      </Typography>
      <div className='grid grid-cols-4 gap-4 px-4 py-2'>
        {carouselImages.map((img) => (
          <div key={img._id} className='max-w-sm rounded overflow-hidden shadow-lg'>
            <img className='w-full' src={img.url} alt='Carousel Image' />
            <div className='px-6 py-4'>
              <Input
                label='Product Link'
                type='text'
                value={img.link}
                onChange={(e) => {
                  const newImages = carouselImages.map((image) =>
                    image._id === img._id ? { ...image, link: e.target.value } : image
                  );
                  setCarouselImages(newImages);
                }}
                className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
