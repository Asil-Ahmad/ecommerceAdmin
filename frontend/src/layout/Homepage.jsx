import React from "react";
import { headphones } from "../assets/homepage";

const Homepage = () => {
  return (
    <section className='container w-full h-screen'>
      <div className='grid grid-cols-4 grid-rows-4 gap-2 h-[70%] '>
        {/* todo 1st */}
        <div
          className='col-span-2 row-span-4 rounded-lg'
          style={{
            backgroundImage: `url(${headphones})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col  justify-center items-start h-full p-4 '>
            <h1 className='text-4xl font-semibold text-white'>Sony 5G Headphones</h1>
            <p className='text-xl font-extralight text-white'>Only Music. Nothing Else</p>
            <button className='bg-white border-white border-1 px-3 py-2 mt-5 rounded-lg'>
              View Details
            </button>
          </div>
        </div>
        {/* todo 2st */}
        <div
          className='row-span-4 col-start-3 bg-blue-500 rounded-lg'
          style={{
            backgroundImage: `url(${headphones})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col text-center justify-start items-center h-full p-4 '>
            <h1 className='text-3xl font-semibold text-white'>Sony 5G Headphones</h1>
            <p className='text-xl font-extralight text-white'>Only Music. Nothing Else</p>
            <button className='bg-white border-white border-1 px-3 py-2 mt-5 rounded-lg'>
              View Details
            </button>
          </div>
        </div>
        {/* todo 3st */}
        <div
          className='row-span-2 col-start-4 bg-green-500 rounded-lg'
          style={{
            backgroundImage: `url(${headphones})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col text-center justify-center items-center h-full p-4 '>
            <h1 className='text-xl font-semibold text-white'>Sony 5G Headphones</h1>
            <p className='text-lg font-extralight text-white'>Only Music. Nothing Else</p>
            <button className='mt-5 text-white text-sm'>View Details</button>
          </div>
        </div>
        {/* todo 4st */}
        <div
          className='row-span-2 col-start-4 bg-green-500 rounded-lg'
          style={{
            backgroundImage: `url(${headphones})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col text-center justify-center items-center h-full p-4 '>
            <h1 className='text-xl font-semibold text-white'>Sony 5G Headphones</h1>
            <p className='text-lg font-extralight text-white'>Only Music. Nothing Else</p>
            <button className='mt-5 text-white text-sm'>View Details</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
