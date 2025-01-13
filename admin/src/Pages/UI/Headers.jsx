import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Typography, CardBody, Input, Textarea } from "@material-tailwind/react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import { PhotoIcon } from "@heroicons/react/24/solid";

const Headers = () => {
  const [headerData, setHeaderData] = useState("");

  const getHeaders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/layout/get-header");
      const { header } = response.data;
      setHeaderData(header);
      console.log(response.data.header);
    } catch (error) {
      console.error(error);
    }
  };

  const updateHeader = async () => {
    try {
      const { _id } = headerData;
      const response = await axios.put("http://localhost:4000/api/layout/update-header", { _id });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getHeaders();
    
  }, []);
  return (
    <div className='flex flex-col  w-full'>
      <header className=''>
        {headerData && (
          <nav
            className='flex justify-between px-20 items-center border-dashed border-2 hover:border-gray-500
             transition-all duration-300 m-2 py-5'
          >
            <img src={headerData.logo} alt='' className='w-[150px] h-[70px] object-cover' />

            <div className='flex gap-10'>
              {headerData?.links.map(({ text, url }, index) => (
                <Link to={url} key={index}>
                  {text}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <div className='w-full flex justify-end p-5'>
        <Button
          variant='outlined'
          className='group outline-none flex items-center gap-3'
          onClick={getHeaders}
        >
          <ArrowPathIcon className='h-5 w-5 transition-all group-hover:rotate-90 duration-500 cursor-pointer' />
          Refresh
        </Button>
      </div>

      <div className='w-full flex justify-start m-auto  bg-gray-50'>
        <CardBody className='w-[60%] rounded-l-lg'>
          <Typography variant='h6' color='blue-gray' className='mb-4'>
            Edit Headers
          </Typography>
          <div className='flex flex-col gap-4'>
            <label className='flex items-center justify-evenly' htmlFor='thumbnail'>
              {headerData.logo ? (
                <img
                  src={
                    typeof headerData.logo === "string"
                      ? headerData.logo
                      : URL.createObjectURL(headerData.logo)
                  }
                  alt='Logo'
                  className='w-[150px] h-[70px] object-cover '
                />
              ) : (
                <PhotoIcon width={100} />
              )}
              <span className='px-2 py-2 bg-gray-200 rounded-lg text-sm'>Upload Logo</span>
            </label>
            <input
              type='file'
              id='thumbnail'
              accept='.jpg,.jpeg,.png'
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                setHeaderData({
                  ...headerData,
                  logo: file ? URL.createObjectURL(file) : headerData.logo,
                });
              }}
            />
            {headerData?.links?.map((link, index) => (
              <div key={index} className='grid grid-cols-2 grid-rows-2 gap-4'>
                <Input
                  label={`Link ${index + 1} Text`}
                  placeholder={`Enter text for link ${index + 1}`}
                  className='bg-white'
                  value={link.text}
                  onChange={(e) => {
                    const newLinks = [...headerData.links];
                    newLinks[index].text = e.target.value;
                    setHeaderData({ ...headerData, links: newLinks });
                  }}
                />
                <Input
                  label={`Link ${index + 1} URL`}
                  placeholder={`Enter URL for link ${index + 1}`}
                  className='bg-white'
                  value={link.url}
                  onChange={(e) => {
                    const newLinks = [...headerData.links];
                    newLinks[index].url = e.target.value;
                    setHeaderData({ ...headerData, links: newLinks });
                  }}
                />
              </div>
            ))}
            <Button onClick={updateHeader}>Save Changes</Button>
          </div>
        </CardBody>
      </div>
    </div>
  );
};

export default Headers;
