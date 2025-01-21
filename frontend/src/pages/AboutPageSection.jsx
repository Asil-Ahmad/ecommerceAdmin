import React from "react";
import { aboutPageSection_img } from "../assets/homepage";

const AboutPageSection = () => {
  return (
    <section className='container py-20'>
      <div className='flex items-start gap-10'>
        <div className='w-1/2'>
          <img src={aboutPageSection_img} alt='' />
        </div>

        <div>
          <h1 className='text-[38px] leading-[48px]'> Lorem ipsum dolor sit amet consectetur.</h1>
          <div className='flex flex-col gap-5 py-5 font-poppins'>
            <div>
              <h2 className='text-[20px] leading-[1.4em] text-red-300 tracking-wider'>
                Fully controlled system
              </h2>
              <p className='text-[20px] leading-[1.4em]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.
              </p>
            </div>
            <div>
              <h2 className='text-[20px] leading-[1.4em] text-red-300 tracking-wider'>
                Fully controlled system
              </h2>
              <p className='text-[20px] leading-[1.4em]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.
              </p>
            </div>
            <div>
              <h2 className='text-[20px] leading-[1.4em] text-red-300 tracking-wider'>
                Fully controlled system
              </h2>
              <p className='text-[20px] leading-[1.4em]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.
              </p>
            </div>
            <div>
              <h2 className='text-[20px] leading-[1.4em] text-red-300 tracking-wider'>
                Fully controlled system
              </h2>
              <p className='text-[20px] leading-[1.4em]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPageSection;
