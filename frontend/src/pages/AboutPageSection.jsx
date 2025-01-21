import React from "react";
import { aboutPageSection_img, img2 } from "../assets/homepage";

const AboutPageSection = () => {
  return (
    <section className='container py-20'>
      {/* top section */}
      <div className='flex items-start gap-10'>
        <div className='w-1/2'>
          <img src={aboutPageSection_img} alt='' />
        </div>

        <div className='py-10'>
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
          </div>
        </div>
      </div>

      {/* bottom section */}
      <div className='flex items-center justify-between '>
        <div className='w-[45.35%]'>
          <img src={img2} alt='' className='' />
        </div>

        <div className='w-[51%] flex flex-col gap-6'>
          <h1 className='text-[38px] leading-[48px]'> Mobile Application to work on the go</h1>
          <p className='text-[20px] leading-[1.4em]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nihil in, cupiditate, ex
            amet suscipit nam harum nulla tempora obcaecati recusandae porro delectus libero
            sapiente itaque, laudantium sint. Veniam, distinctio!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPageSection;
