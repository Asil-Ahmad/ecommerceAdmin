import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Button, CardBody, Typography, Input } from "@material-tailwind/react";
import { toast } from "react-toastify";

import Loader from "../../constant/Loader";

const Homepage = () => {
  const [homepageData, setHomepageData] = useState([]);
  const [homepageId, setHomepageId] = useState("");
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHomepage = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/layout/get-homepage");
      const { images } = response.data.homepage[0];
      setHomepageData(images);
      setHomepageId(response.data.homepage[0]._id);

      setFormData(images);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch homepage data");
    }
  };
  console.log("this", homepageId);

  useEffect(() => {
    fetchHomepage();
  }, []);

  const handleInputChange = (e, idx, field) => {
    const newFormData = [...formData];
    newFormData[idx][field] = e.target.value;
    setFormData(newFormData);
  };

  const handleImageChange = (e, idx) => {
    const file = e.target.files[0];
    const newFormData = [...formData];
    newFormData[idx].url = URL.createObjectURL(file);
    newFormData[idx].file = file;
    setFormData(newFormData);
  };
  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const _id = homepageId;
      const formDataToSend = new FormData();
      formDataToSend.append("_id", _id);

      formData.forEach((data, idx) => {
        // Always append text and paragraph fields
        formDataToSend.append(`text${idx + 1}`, data.text || "");
        formDataToSend.append(`para${idx + 1}`, data.para || "");

        // Append the image file if it exists, otherwise send the current URL
        if (data.file) {
          formDataToSend.append(`image${idx + 1}`, data.file);
        } else {
          formDataToSend.append(`url${idx + 1}`, data.url || "");
        }
      });

      const response = await axios.post(
        "http://localhost:4000/api/layout/update-homepage",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      // Update state with the latest changes
      setHomepageData(formData);
      toast.success("Changes saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <section className='container w-full overflow-y-scroll '>
      <div className='grid grid-cols-4 grid-rows-4 gap-2 h-[31rem] p-4 m-2 border-dashed hover:border-gray-400 transition-all duration-300 border-2 '>
        {/* todo 1st */}
        <div
          className='col-span-2 row-span-4 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[0]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col justify-end items-start h-full p-4'>
            <div className='bg-black/20 px-3 py-2 rounded-lg'>
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
        </div>
        {/* todo 2nd */}
        <div
          className='row-span-4 col-start-3 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[1]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col text-center justify-end items-center h-full p-4'>
            <div className='bg-black/20 px-3 py-2 rounded-lg'>
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
        </div>
        {/* todo 3rd */}
        <div
          className='row-span-2 col-start-4 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[2]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col justify-center items-start h-full p-4'>
            <div className='bg-black/20 px-3 py-2 rounded-lg'>
              <h1 className='text-xl font-semibold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_70%)]'>
                {homepageData[2]?.text}
              </h1>
              <p className='text-md font-extralight text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
                {homepageData[2]?.para}
              </p>
              <button className='mt-5 text-white text-sm'>View Details</button>
            </div>
          </div>
        </div>
        {/* todo 4th */}
        <div
          className='row-span-2 col-start-4 rounded-lg'
          style={{
            backgroundImage: `url(${homepageData[3]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='flex flex-col text-center justify-center items-center h-full p-4 cursor-pointer'>
            <div className='bg-black/20 px-3 py-2 rounded-lg transition-opacity ease-in duration-300 opacity-100 hover:opacity-0'>
              <h1 className='text-xl font-semibold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
                {homepageData[3]?.text}
              </h1>
              <p className='text-lg font-extralight text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
                {homepageData[3]?.para}
              </p>
              <button className='mt-5 text-white text-sm'>View Details</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Homepage */}
      <div className='w-full flex justify-between items-start mt-5 bg-gray-50 p-2'>
        <CardBody className='w-[60%] rounded-l-lg'>
          <Typography variant='h6' color='blue-gray' className='mb-4'>
            Edit Homepage
          </Typography>
          <div className='flex flex-col items-start gap-4'>
            {formData.map((data, idx) => (
              <div key={data._id} className='grid grid-cols-3 grid-rows-1 gap-4 mb-5'>
                <label
                  className='flex items-center justify-evenly cursor-pointer'
                  htmlFor={`thumbnail-${idx}`}
                >
                  <span className='px-2 py-2 bg-gray-200 rounded-lg text-sm cursor-pointer'>
                    Upload Image {idx + 1}
                  </span>
                </label>
                <input
                  type='file'
                  id={`thumbnail-${idx}`}
                  accept='.jpg,.jpeg,.png'
                  hidden
                  onChange={(e) => handleImageChange(e, idx)}
                />
                <Input
                  label={`Image ${idx + 1} Text`}
                  placeholder={`Enter text for image ${idx + 1}`}
                  className='bg-white'
                  value={data.text || ""}
                  onChange={(e) => handleInputChange(e, idx, "text")}
                />
                <Input
                  label={`Image ${idx + 1} Paragraph`}
                  placeholder={`Enter paragraph for image ${idx + 1}`}
                  className='bg-white'
                  value={data.para || ""}
                  onChange={(e) => handleInputChange(e, idx, "para")}
                />
              </div>
            ))}
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </CardBody>
        <Button
          variant='outlined'
          className='group outline-none flex items-center gap-3 mt-5'
          onClick={fetchHomepage}
        >
          <ArrowPathIcon className='h-5 w-5 transition-all group-hover:rotate-90 duration-500 cursor-pointer' />
          Refresh
        </Button>
      </div>
    </section>
  );
};

export default Homepage;
