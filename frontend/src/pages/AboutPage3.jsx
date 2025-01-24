import React from "react";
import { aboutPage3, companies, happyclients } from "../assets/homepage";

const AboutPage3 = () => {
  return (
    <section className='bg-gradient-to-tr from-red-700 to-black text-gray-200  '>
      {/* todo left section */}
      <div className="max-w-[1440px] flex justify-between m-auto">
        <div className='container py-20 w-1/2 flex flex-col gap-5 '>
          <h1 className='text-[38px] leading-[48px] font-medium'>
            <span className='text-red-400'>Inventory Visibility</span> for <br /> seamless
            management
          </h1>
          <p className='text-[20px] leading-[1.4em]'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi aliquid voluptatem,
            cupiditate id quae beatae temporibus dolorum assumenda magni veritatis tempora odio
            eaque possimus quisquam magnam, suscipit ipsum laborum voluptas.
          </p>
          <p className='text-[20px] leading-[1.4em]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam corporis quo, est
            voluptatibus distinctio nemo?
          </p>

          <div className='mt-10 flex justify-between'>
            {/* left num */}
            <div className='flex items-center gap-5'>
              <img src={companies} alt='' className='w-12' />
              <div className='flex flex-col items-center'>
                <h1 className='text-5xl font-bold'>100%</h1>
                <p>Inventory Accuracy</p>
              </div>
            </div>
            {/* right num */}
            <div className='flex items-center gap-5'>
              <img src={happyclients} alt='' className='w-12' />
              <div className='flex flex-col items-center'>
                <h1 className='text-5xl font-bold'>100%</h1>
                <p className='text-lg  tracking-wider'>Inventory Accuracy</p>
              </div>
            </div>
          </div>
        </div>
        {/* todo right section */}
        <div className='w-1/2'>
          <img src={aboutPage3} alt='aboutPage3' />
        </div>
      </div>
    </section>
  );
};

export default AboutPage3;
