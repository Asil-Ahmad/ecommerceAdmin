import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Button, CardBody, Typography, Input } from "@material-tailwind/react";

const Homepage = () => {
  const [homepageData, setHomepageData] = useState("");
  const index = 1;

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
    <section className='container w-full overflow-y-scroll p-4'>
      <div className='grid grid-cols-4 grid-rows-4 gap-2 h-[70%] border-dashed border-2 border-gray-300 p-4'>
        {/* todo 1st */}
        <div
          className='col-span-2 row-span-4 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[0]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col  justify-center items-start h-full p-4 '>
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
        {/* todo 2st */}
        <div
          className='row-span-4 col-start-3 bg-blue-500 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[1]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col text-center justify-start items-center h-full p-4 '>
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
        {/* todo 3st */}
        <div
          className='row-span-2 col-start-4 bg-green-500 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[2]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col justify-center items-start h-full p-4 '>
            <h1 className='text-xl font-semibold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_70%)]'>
              {homepageData[2]?.text}
            </h1>
            <p className='text-md font-extralight text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
              {homepageData[2]?.para}
            </p>
            <button className='mt-5 text-white text-sm'>View Details</button>
          </div>
        </div>
        {/* todo 4st */}
        <div
          className='row-span-2 col-start-4 bg-green-500 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[3]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col text-center justify-center items-center h-full p-4  '>
            <h1 className='text-xl font-semibold text-white  [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
              {homepageData[3]?.text}
            </h1>
            <p className='text-lg font-extralight text-white  [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
              {homepageData[3]?.para}
            </p>
            <button className='mt-5 text-white text-sm bg-white/20'>View Details</button>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-end p-5'>
        <Button
          variant='outlined'
          className='group outline-none flex items-center gap-3'
          //   onClick={getHeaders}
        >
          <ArrowPathIcon className='h-5 w-5 transition-all group-hover:rotate-90 duration-500 cursor-pointer' />
          Refresh
        </Button>
      </div>

      {/* todo Edit Homepage */}

      <div className='w-full flex justify-start m-auto bg-gray-50'>
        <CardBody className='w-[60%] rounded-l-lg'>
          <Typography variant='h6' color='blue-gray' className='mb-4'>
            Edit Homepage
          </Typography>
          <div className='flex flex-col gap-4'>
            <label className='flex items-center justify-evenly cursor-pointer' htmlFor='thumbnail'>
              {/* {headerData.logo && (
                <img
                  src={
                    typeof headerData.logo === "string"
                      ? headerData.logo
                      : URL.createObjectURL(headerData.logo)
                  }
                  alt='Logo'
                  className='w-[150px] h-[70px] object-contain'
                />
              )}
              {!headerData.logo && <PhotoIcon width={100} />} */}
              <span className='px-2 py-2 bg-gray-200 rounded-lg text-sm cursor-pointer'>
                Upload Image 1
              </span>
            </label>
            <input
              type='file'
              id='thumbnail'
              accept='.jpg,.jpeg,.png'
              hidden
              //   onChange={(e) => {
              //     const file = e.target.files[0];
              //     setHeaderData((prevData) => ({
              //       ...prevData,
              //       logo: file || prevData.logo,
              //     }));
              //   }}
            />
            {/* {headerData?.links?.map((link, index) => ( */}
            <div key={index} className='grid grid-cols-2 grid-rows-2 gap-4'>
              <Input
                label={`Link ${index + 1} Text`}
                placeholder={`Enter text for link ${index + 1}`}
                className='bg-white'
                // value={link.text || ""}
                //   onChange={(e) => {
                //     const newLinks = [...headerData.links];
                //     newLinks[index].text = e.target.value;
                //     setHeaderData({ ...headerData, links: newLinks });
                //   }}
              />
              <Input
                label={`Link ${index + 1} URL`}
                placeholder={`Enter URL for link ${index + 1}`}
                className='bg-white'
                // value={link.url || ""}
                //   onChange={(e) => {
                //     const newLinks = [...headerData.links];
                //     newLinks[index].url = e.target.value;
                //     setHeaderData({ ...headerData, links: newLinks });
                //   }}
              />
            </div>
            {/* ))} */}
            <Button>Save Changes</Button>
          </div>
        </CardBody>
      </div>
    </section>
  );
};

export default Homepage;
