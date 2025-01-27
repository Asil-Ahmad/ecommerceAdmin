import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Card, CardBody, Typography, Input, Textarea, Button } from "@material-tailwind/react";
import Loader from "../../constant/Loader";
import { toast } from "react-toastify";

const AboutHero = () => {
  const [aboutData, setAboutData] = useState({
    text1: "",
    text1Color: "",
    text2: "",
    text2Color: "",
    para: "",
    paraColor: "",
    buttonText: "",
    buttonTextColor: "",
    bgColor: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/aboutPage/get-aboutPage");
      const { aboutPage } = response.data;
      // console.log("About Data", aboutPage);
      setAboutData(aboutPage);
    } catch (error) {
      console.log("Error fetching About data", error);
    }
  };

  const updateAboutData = async (id) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("text1", aboutData.text1);
      formData.append("text1Color", aboutData.text1Color);
      formData.append("text2", aboutData.text2);
      formData.append("text2Color", aboutData.text2Color);
      formData.append("para", aboutData.para);
      formData.append("paraColor", aboutData.paraColor);
      formData.append("buttonText", aboutData.buttonText);
      formData.append("buttonTextColor", aboutData.buttonTextColor);
      formData.append("bgColor", aboutData.bgColor);

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
      toast.success("About data updated successfully");
      console.log("About Data Updated", response.data);

      fetchAboutData();
    } catch (error) {
      toast.error("Error updating About data");
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
    <div>
      <div
        key={aboutData._id}
        style={{
          background: `linear-gradient(to right, ${aboutData.bgColor}, black)`,
        }}
        className='mx-auto sticky top-0 z-20'
      >
        <div className='container mx-auto pt-10 px-10 flex justify-between gap-10 items-center'>
          <div className='flex flex-col w-1/2 items-start gap-7'>
            <h1 className='text-[34px] leading-[48px]'>
              <span style={{ color: aboutData.text1Color }}>{aboutData.text1}</span>

              <span style={{ color: aboutData.text2Color }}>{aboutData.text2}</span>
            </h1>
            <p
              className={`text-md font-light tracking-wider `}
              style={{ color: aboutData.paraColor }}
            >
              {aboutData.para}
            </p>
            <button
              className='py-3 px-10 rounded-md text-white'
              style={{ backgroundColor: aboutData.buttonTextColor }}
            >
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

      <Card className='container mx-auto p-8'>
        <CardBody className='p-6'>
          <Typography variant='h2' className='text-2xl font-bold mb-6'>
            Edit Hero Section
          </Typography>
          <form className='space-y-6'>
            <Input
              label='Heading Text 1'
              type='text'
              value={aboutData.text1 || ""}
              onChange={(e) => setAboutData({ ...aboutData, text1: e.target.value })}
            />

            <Input
              label='Heading Text 2'
              type='text'
              value={aboutData.text2 || ""}
              onChange={(e) => setAboutData({ ...aboutData, text2: e.target.value })}
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

            <div className='grid grid-cols-5 grid-rows-1 w-full'>
              <Input
                label='Heading Text 1 Color'
                type='color'
                value={aboutData.text1Color || ""}
                onChange={(e) => setAboutData({ ...aboutData, text1Color: e.target.value })}
              />
              <Input
                label='Heading Text 2 Color'
                type='color'
                value={aboutData.text2Color || ""}
                onChange={(e) => setAboutData({ ...aboutData, text2Color: e.target.value })}
              />
              <Input
                label='Paragraph Color'
                type='color'
                value={aboutData.paraColor || ""}
                onChange={(e) => {
                  setAboutData({ ...aboutData, paraColor: e.target.value });
                }}
              />
              <Input
                label='Button Text Color'
                type='color'
                value={aboutData.buttonTextColor || ""}
                onChange={(e) => setAboutData({ ...aboutData, buttonTextColor: e.target.value })}
              />
              <Input
                label='Background Color'
                type='color'
                value={aboutData.bgColor || ""}
                onChange={(e) => setAboutData({ ...aboutData, bgColor: e.target.value })}
              />
            </div>
            <div className='max-w-40 border-dashed border-2 border-gray-400 p-4 rounded-md'>
              <label htmlFor='image' className='flex flex-col gap-3'>
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
            <small className='text-red-600'>Note* Your Image must be a 500x400</small>
            <Button type='button' className='w-full' onClick={() => updateAboutData(aboutData._id)}>
              Save Changes
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AboutHero;
