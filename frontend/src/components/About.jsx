import React from "react";
import { useGetAboutPageQuery } from "../services/TMDB";

const About = () => {
  const { data: { aboutPage } = {}, isFetching, error } = useGetAboutPageQuery();
  console.log("this", aboutPage);

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;
  return (
    <div
      key={aboutPage._id}
      style={{
        background: `linear-gradient(to right, ${aboutPage.bgColor}, black)`,
      }}
      className=''
    >
      <div className='container w-full m-auto pt-10 px-20 flex justify-between gap-10 items-center'>
        <div className='flex flex-col w-1/2 items-start h-full gap-7'>
          <h1 className='text-[38px] leading-[48px]'>
            <span style={{ color: aboutPage.text1Color }}>{aboutPage.text1}</span>

            <span style={{ color: aboutPage.text2Color }}>{aboutPage.text2}</span>
          </h1>
          <p className={`text-lg font-light tracking-wider`} style={{ color: aboutPage.paraColor }}>
            {aboutPage.para}
          </p>
          <button
            className='py-3 px-10 rounded-md text-white'
            style={{ backgroundColor: aboutPage.buttonTextColor }}
          >
            {aboutPage.buttonText}
          </button>
        </div>
        <div className='w-1/2 flex justify-center items-end h-full'>
          <img src={aboutPage.image} alt='About' className='w-[50%]' />
        </div>
      </div>
    </div>
  );
};

export default About;
