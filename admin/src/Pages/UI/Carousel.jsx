import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "../../constant/Slider";
import { Typography, Input, Card, CardHeader, CardBody } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

const Carousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const fetchCarousel = async () => {
    try {
      const response = await axios("http://localhost:4000/api/layout/get-carousel");
      const { carousel } = response.data;
      console.log(carousel);
      setCarouselImages(carousel);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    fetchCarousel();
  }, []);

  return (
    <div className='container mx-auto'>
      <div className='p-4 m-2 border-dashed hover:border-gray-400 transition-all duration-300 border-2 sticky top-0 z-50 bg-white'>
        <Slider carouselImages={carouselImages} />
      </div>

      <div className='px-4 py-6'>
        <Typography variant='h6' color='blue-gray' className='mb-4'>
          Carousel Slides Preview ({carouselImages.length})
        </Typography>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center '>
          {carouselImages.map((img) => (
            <Card key={img._id} className='overflow-hidden'>
              <CardHeader
                floated={false}
                shadow={false}
                color='transparent'
                className='m-0 rounded-none'
              >
                <img
                  src={img.image}
                  alt='Carousel Image'
                  className='w-full h-24 object-cover object-top'
                />
              </CardHeader>
              <CardBody className='mt-5'>
                <Input
                  label='Product Link'
                  value={img.link}
                  onChange={(e) => {
                    const newImages = carouselImages.map((image) =>
                      image._id === img._id ? { ...image, link: e.target.value } : image
                    );
                    setCarouselImages(newImages);
                  }}
                />
              </CardBody>
            </Card>
          ))}
          <div className='flex justify-center items-center'>
            <PlusIcon className='w-10 h-10 bg-gray-200 hover:bg-gray-500 transition-all duration-200 hover:text-white rounded-lg p-2 cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
