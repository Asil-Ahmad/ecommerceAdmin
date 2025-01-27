import React, { useState, useEffect } from "react";

import { headphones } from "../assets/homepage";
import axios from "axios";

const Homepage = () => {
  const [homepageData, setHomepageData] = useState("");

  const fetchHomepage = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/layout/get-homepage");
      const { images } = response.data.homepage[0];
      setHomepageData(images);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchHomepage();
  }, []);

  return (
    <section className='container w-full  '>
      <div className='grid grid-cols-4 grid-rows-4 gap-2 h-[31rem] '>
        {/* todo 1st */}
        <div
          className='col-span-2 row-span-4 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[0]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col  justify-end items-start h-full p-4 '>
            <div className='bg-black/20 px-3 py-2 rounded-lg '>
              <h1 className='text-4xl font-semibold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
                {homepageData[0]?.text}
              </h1>
              <p className='text-xl font-extralight text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
                {homepageData[0]?.para}
              </p>
              <button className='bg-white border-white border-1 px-3 py-2 mt-5 rounded-lg'>
                View Details
              </button>
            </div>
          </div>
        </div>
        {/* todo 2st */}
        <div
          className='row-span-4 col-start-3 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[1]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col text-center justify-end items-center h-full p-4 '>
            <div className='bg-black/20 px-3 py-2 rounded-lg'>
              <h1 className='text-3xl font-semibold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
                {homepageData[1]?.text}
              </h1>
              <p className='text-xl font-extralight text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
                {homepageData[1]?.para}
              </p>
              <button className='bg-white border-white border-1 px-3 py-2 mt-5 rounded-lg'>
                View Details
              </button>
            </div>
          </div>
        </div>
        {/* todo 3st */}
        <div
          className='row-span-2 col-start-4  rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[2]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col justify-center items-start h-full p-4 '>
            <div className='bg-black/20 px-3 py-2 rounded-lg'>
              <h1 className='text-xl font-semibold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_70%)]'>
                {homepageData[2]?.text}
              </h1>
              <p className='text-md font-extralight text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
                {homepageData[2]?.para}
              </p>
              <button className='mt-5 text-white text-sm'>View Details</button>
            </div>
          </div>
        </div>
        {/* todo 4st */}
        <div
          className='row-span-2 col-start-4  rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[3]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col text-center justify-center items-center h-full p-4 cursor-pointer  '>
            <div className='bg-black/20 px-3 py-2 rounded-lg transition-opacity ease-in duration-300 opacity-100 hover:opacity-0'>
              <h1 className='text-xl font-semibold text-white  [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
                {homepageData[3]?.text}
              </h1>
              <p className='text-lg font-extralight text-white  [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
                {homepageData[3]?.para}
              </p>
              <button className='mt-5 text-white text-sm '>View Details</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
