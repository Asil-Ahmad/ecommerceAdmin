import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Button, CardBody, Typography, Input } from "@material-tailwind/react";

const Homepage = () => {
  const [homepageData, setHomepageData] = useState([]);
  const [formData, setFormData] = useState([]);
  const index = 1;

  const fetchHomepage = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/layout/get-homepage");
      const { images } = response.data.homepage[0];
      setHomepageData(images);
      setFormData(images);
    } catch (error) {
      console.error(error);
    }
  };

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
    setFormData(newFormData);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post("http://localhost:4000/api/layout/update-homepage", { images: formData });
      setHomepageData(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='container w-full overflow-y-scroll p-4'>
      <div className='grid grid-cols-4 grid-rows-4 gap-2 h-[50%] border-dashed border-2 border-gray-300 p-4'>
        {homepageData.map((data, idx) => (
          <div
            key={idx}
            className={`col-span-${idx === 0 ? 2 : 1} ${
              idx === 1 ? "row-span-4 col-start-3" : `row-span-${idx === 0 ? 4 : 2}`
            } rounded-lg`}
            style={{
              backgroundImage: `url(${data.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className='flex flex-col justify-end items-start h-full p-4'>
              <div className='bg-black/20 px-3 py-2 rounded-lg'>
                <h1 className='text-3xl font-semibold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
                  {data.text}
                </h1>
                <p className='text-lg font-extralight text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
                  {data.para}
                </p>
                <button className='bg-white border-white border-1 px-3 py-2 mt-5 rounded-lg'>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='w-full flex justify-end p-5'>
        <Button
          variant='outlined'
          className='group outline-none flex items-center gap-3'
          onClick={fetchHomepage}
        >
          <ArrowPathIcon className='h-5 w-5 transition-all group-hover:rotate-90 duration-500 cursor-pointer' />
          Refresh
        </Button>
      </div>

      {/* Edit Homepage */}
      <div className='w-full flex justify-start m-auto bg-gray-50'>
        <CardBody className='w-[60%] rounded-l-lg'>
          <Typography variant='h6' color='blue-gray' className='mb-4'>
            Edit Homepage
          </Typography>
          <div className='flex flex-col gap-4'>
            {formData.map((data, idx) => (
              <div key={idx} className='grid grid-cols-3 grid-rows-2 gap-4'>
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
      </div>
    </section>
  );
};

export default Homepage;
