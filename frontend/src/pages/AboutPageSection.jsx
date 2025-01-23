import React from "react";
import { aboutPageSection_img, img2 } from "../assets/homepage";
import { useGetAboutPageFeatureQuery } from "../services/TMDB";

const AboutPageSection = () => {
  const { data, loading, error } = useGetAboutPageFeatureQuery();
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className='container py-20'>
      {/* top section */}
      <div className='flex items-start gap-10'>
        <div className='w-1/2'>
          <img src={data?.image1} alt='' className="w-[572px] h-[500px] object-cover" />
        </div>

        <div className='py-10'>
          <h1 className='text-[38px] leading-[48px]'>{data?.text1}</h1>
          <div className='flex flex-col gap-5 py-5 font-poppins'>
            <div>
              <h2 className='text-[20px] leading-[1.4em] text-red-300 tracking-wider'>
                {data?.paraTitle1}
              </h2>
              <p className='text-[20px] leading-[1.4em]'>{data?.paraContent1}</p>
            </div>

            <div>
              <h2 className='text-[20px] leading-[1.4em] text-red-300 tracking-wider'>
                {data?.paraTitle2}
              </h2>
              <p className='text-[20px] leading-[1.4em]'>{data?.paraContent2}</p>
            </div>

            <div>
              <h2 className='text-[20px] leading-[1.4em] text-red-300 tracking-wider'>
                {data?.paraTitle3}
              </h2>
              <p className='text-[20px] leading-[1.4em]'>{data?.paraContent3}</p>
            </div>

            <div>
              <h2 className='text-[20px] leading-[1.4em] text-red-300 tracking-wider'>
                {data?.paraTitle4}
              </h2>
              <p className='text-[20px] leading-[1.4em]'>{data?.paraContent4}</p>
            </div>
          </div>
        </div>
      </div>

      {/* bottom section */}
      <div className='flex items-center justify-between '>
        <div className='w-[45.35%]'>
          <img src={data?.image2} alt='' className="w-[572px] h-[500px] object-cover" />
        </div>

        <div className='w-[51%] flex flex-col gap-6'>
          <h1 className='text-[38px] leading-[48px]'>{data?.text2}</h1>
          <p className='text-[20px] leading-[1.4em]'>
          {data?.text2Content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPageSection;
