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
  console.log("This", homepageData[0].text);

  return (
    <section className='container w-full h-screen'>
      <div className='grid grid-cols-4 grid-rows-4 gap-2 h-[70%] '>
        {/* todo 1st */}
        <div
          className='col-span-2 row-span-4 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[0].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col  justify-center items-start h-full p-4 '>
            <h1 className='text-4xl font-semibold text-white'>{homepageData[0].text}</h1>
            <p className='text-xl font-extralight text-white'>{homepageData[0].para}</p>
            <button className='bg-white border-white border-1 px-3 py-2 mt-5 rounded-lg'>
              View Details
            </button>
          </div>
        </div>
        {/* todo 2st */}
        <div
          className='row-span-4 col-start-3 bg-blue-500 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[1].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col text-center justify-start items-center h-full p-4 '>
            <h1 className='text-3xl font-semibold text-white'>{homepageData[1].text}</h1>
            <p className='text-xl font-extralight text-white'>{homepageData[1].para}</p>
            <button className='bg-white border-white border-1 px-3 py-2 mt-5 rounded-lg'>
              View Details
            </button>
          </div>
        </div>
        {/* todo 3st */}
        <div
          className='row-span-2 col-start-4 bg-green-500 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[2].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col text-center justify-center items-center h-full p-4 '>
            <h1 className='text-xl font-semibold text-white'>{homepageData[2].text}</h1>
            <p className='text-lg font-extralight text-white'>{homepageData[2].para}</p>
            <button className='mt-5 text-white text-sm'>View Details</button>
          </div>
        </div>
        {/* todo 4st */}
        <div
          className='row-span-2 col-start-4 bg-green-500 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[3].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col text-center justify-center items-center h-full p-4 '>
            <h1 className='text-xl font-semibold text-white'>{homepageData[3].text}</h1>
            <p className='text-lg font-extralight text-white'>{homepageData[3].para}</p>
            <button className='mt-5 text-white text-sm'>View Details</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
