import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Typography, CardBody, Input } from "@material-tailwind/react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Loader from "../../constant/Loader";

const Headers = () => {
  const [headerData, setHeaderData] = useState({
    logo: "",
    links: [],
  });
  const [loading, setLoading] = useState(false);

  const getHeaders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/layout/get-header");
      const { header } = response.data;
      setHeaderData(header);
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateHeader = async () => {
    setLoading(true);
    try {
      const { _id, links, logo } = headerData || {};

      const formData = new FormData();
      formData.append("_id", _id);
      formData.append(
        "links",
        JSON.stringify(links.map((link) => ({ text: link.text, url: link.url })))
      );

      // Append the logo only if it's a file
      if (logo && typeof logo !== "string") {
        formData.append("logo", logo);
      } else if (logo && typeof logo === "string") {
        formData.append("logo", logo); // Add the string directly
      }

      const response = await axios.post(
        "http://localhost:4000/api/layout/update-header",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Header updated successfully!");
        getHeaders(); // Refresh the data
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update header");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHeaders();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className='flex flex-col w-full'>
      <header className='sticky top-0 z-50 bg-gray-300 backdrop-blur-md bg-opacity-10'>
        {headerData && (
          <nav className='flex justify-between px-20 items-center border-dashed border-2 hover:border-gray-500 transition-all duration-300 m-2 py-5'>
            {headerData.logo && (
              <img
                src={
                  typeof headerData.logo === "string"
                    ? headerData.logo
                    : URL.createObjectURL(headerData.logo)
                }
                alt='Logo'
                className='w-[150px] h-[50px] object-contain '
              />
            )}

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

      {/* todo Form */}
      <div className='w-full flex justify-evenly items-start h-full bg-gray-50'>
        <CardBody className='w-[60%] rounded-l-lg'>
          <Typography variant='h6' color='blue-gray' className='mb-4'>
            Edit Headers
          </Typography>
          <div className='flex flex-col gap-4'>
            <label className='flex items-center justify-evenly cursor-pointer' htmlFor='thumbnail'>
              {headerData.logo && (
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
              {!headerData.logo && <PhotoIcon width={100} />}
              <span className='px-2 py-2 bg-gray-200 rounded-lg text-sm cursor-pointer'>
                Upload Logo
              </span>
            </label>
            <input
              type='file'
              id='thumbnail'
              accept='.jpg,.jpeg,.png'
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                setHeaderData((prevData) => ({
                  ...prevData,
                  logo: file || prevData.logo,
                }));
              }}
            />
            {headerData?.links?.map((link, index) => (
              <div key={index} className='grid grid-cols-2 grid-rows-1 mb-5 gap-4'>
                <Input
                  label={`Link ${index + 1} Text`}
                  placeholder={`Enter text for link ${index + 1}`}
                  className='bg-white'
                  value={link.text || ""}
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
                  value={link.url || ""}
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
        <Button
          variant='outlined'
          className='group outline-none flex items-center gap-3 mt-5'
          onClick={getHeaders}
        >
          <ArrowPathIcon className='h-5 w-5 transition-all group-hover:rotate-90 duration-500 cursor-pointer' />
          Refresh
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Headers;
