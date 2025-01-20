import React from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const AboutHero = () => {
  const { aboutData } = useContext(ShopContext);
  console.log(aboutData.color);

  return (
    <>
      <div
        key={aboutData._id}
        style={{
          background: `linear-gradient(to right, ${aboutData.bgColor}, black)`,
        }}
        className='mx-auto'
      >
        <div className='container mx-auto pt-10 px-20 flex justify-between gap-10 items-center h-[70vh]'>
          <div className='flex flex-col w-1/2 items-start gap-7'>
            <h1 className='text-[38px] leading-[48px]'>
              <span className='text-red-300'>{aboutData.text}</span>
            </h1>
            <p className='text-lg font-light text-white tracking-wider'>{aboutData.para}</p>
            <button className='bg-red-300 text-white py-2 px-10 rounded-md'>
              {aboutData.buttonText}
            </button>
          </div>
          <div className='w-1/2 flex justify-center items-end h-full'>
            <img src={aboutData.image} alt='About' className='w-[50%]' />
          </div>
        </div>
      </div>

      {/* todo Form Edit */}
    </>
  );
};

export default AboutHero;
