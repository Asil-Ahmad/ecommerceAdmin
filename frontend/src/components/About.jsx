import React from "react";
import { useGetAboutPageQuery } from "../services/TMDB";

const About = () => {
  const { data, isFetching, error } = useGetAboutPageQuery();
  console.log(data);

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;
  return (
    <>
      {/* bg-[${item.bgColor}] */}
      {data?.aboutPage?.map((item) => (
        <div key={item._id} className={`bg-gradient-to-r from-[${item.bgColor}] to-black m-auto`}>
          <div className='container mx-auto pt-10 px-20 flex justify-between gap-10 items-center'>
            <div className='flex flex-col w-1/2 items-start h-full gap-7'>
              <h1 className='text-[38px] leading-[48px]'>
                <span className='text-red-300'>{item.text}</span>
              </h1>
              <p className='text-lg font-light text-white tracking-wider'>{item.para}</p>
              <button className='bg-red-300 text-white py-2 px-10 rounded-md'>
                {item.buttonText}
              </button>
            </div>
            <div className='w-1/2 flex justify-center items-end h-full'>
              <img src={item.image} alt='About' className='w-[50%]' />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default About;
