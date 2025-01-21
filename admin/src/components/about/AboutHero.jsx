import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Card, CardBody, Typography, Input, Textarea, Button } from "@material-tailwind/react";
import Loader from "../../constant/Loader";
import { toast } from "react-toastify";

const AboutHero = () => {
  const [aboutData, setAboutData] = useState({
    text: "",
    para: "",
    buttonText: "",
    bgColor: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/aboutPage/get-aboutPage");
      const { aboutPage } = response.data;
      console.log("About Data", aboutPage);
      setAboutData(aboutPage);
    } catch (error) {
      console.log("Error fetching About data", error);
    }
  };

  const updateAboutData = async (id) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", id); // Use 'id' instead of '_id'
      formData.append("text", aboutData.text);
      formData.append("para", aboutData.para);
      formData.append("buttonText", aboutData.buttonText);
      formData.append("bgColor", aboutData.bgColor);

      // Append image only if it exists and is a file (not a URL string)
      if (aboutData.image && typeof aboutData.image !== "string") {
        formData.append("image", aboutData.image);
      }

      const response = await axios.post(
        "http://localhost:4000/api/aboutPage/update-aboutPage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("About Data Updated", response.data);

      fetchAboutData(); // Refresh the data after successful update
    } catch (error) {
      console.error("Error updating About data", error);
    } finally {
      setLoading(false);
      toast.success("About data updated successfully");
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div
        key={aboutData._id}
        style={{
          background: `linear-gradient(to right, ${aboutData.bgColor}, black)`,
        }}
        className='mx-auto sticky top-0 z-20  '
      >
        <div className='container mx-auto pt-10 px-20 flex justify-between gap-10 items-center'>
          <div className='flex flex-col w-1/2 items-start gap-7'>
            <h1 className='text-[38px] leading-[48px]'>
              <span className='text-red-300'>{aboutData.text}</span>
            </h1>
            <p className='text-lg font-light text-white tracking-wider'>{aboutData.para}</p>
            <button className='bg-red-300 text-white py-2 px-10 rounded-md'>
              {aboutData.buttonText}
            </button>
          </div>
          <div className='w-1/2 flex justify-center items-end h-full'>
            <img
              src={
                typeof aboutData.image === "string"
                  ? aboutData.image
                  : URL.createObjectURL(aboutData.image)
              }
              alt='About'
              className='w-[500px] h-[400px] object-contain'
            />
          </div>
        </div>
      </div>

      {/* todo Edit Form */}
      <Card className='container mx-auto p-8'>
        <CardBody className='p-6'>
          <Typography variant='h2' className='text-2xl font-bold mb-6'>
            Edit Hero Section
          </Typography>
          <form className='space-y-6'>
            <Input
              label='Heading Text'
              type='text'
              value={aboutData.text || ""}
              onChange={(e) => setAboutData({ ...aboutData, text: e.target.value })}
              className=''
            />

            <Textarea
              label='Paragraph'
              value={aboutData.para || ""}
              onChange={(e) => setAboutData({ ...aboutData, para: e.target.value })}
              rows={3}
            />

            <Input
              label='Button Text'
              type='text'
              value={aboutData.buttonText || ""}
              onChange={(e) => setAboutData({ ...aboutData, buttonText: e.target.value })}
            />

            <div className='max-w-11'>
              <Input
                label='Background Color'
                type='color'
                value={aboutData.bgColor || ""}
                onChange={(e) => {
                  setAboutData({ ...aboutData, bgColor: e.target.value }),
                    console.log(e.target.value);
                }}
              />
            </div>

            <div>
              <label htmlFor='image' className='flex flex-col gap-3'>
                Select Image
                <div className='flex gap-4'>
                  {aboutData.image && (
                    <img
                      src={
                        typeof aboutData.image === "string"
                          ? aboutData.image
                          : URL.createObjectURL(aboutData.image)
                      }
                      alt='Logo'
                      className='w-[150px] h-[70px] object-contain'
                    />
                  )}
                </div>
              </label>
              <input
                type='file'
                label='Image'
                id='image'
                accept='image/*'
                hidden
                onChange={(e) => setAboutData({ ...aboutData, image: e.target.files[0] })}
              />
            </div>

            <Button type='button' className='w-full' onClick={() => updateAboutData(aboutData._id)}>
              Save Changes
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default AboutHero;
