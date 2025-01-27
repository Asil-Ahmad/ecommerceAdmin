import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, Typography, Input, Textarea, Button } from "@material-tailwind/react";

const AboutPage3 = () => {
  const [aboutData, setAboutData] = useState({
    bgColor: "",
    image: "",
    num1: "",
    num2: "",
    para1: "",
    para1Color: "",
    para2: "",
    para2Color: "",
    text1: "",
    text1Color: "",
    text2: "",
    text2Color: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/aboutPage3/get-aboutPage3");
      const { aboutPage } = response.data;
      console.log("About Data 3", aboutPage);
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
      formData.append("para1", aboutData.para1);
      formData.append("para1Color", aboutData.para1Color);
      formData.append("para2", aboutData.para2);
      formData.append("para2Color", aboutData.para2Color);
      formData.append("num1", aboutData.num1);
      formData.append("num2", aboutData.num2);
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

      console.log("About Data Updated", response.data);

      fetchAboutData();
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
  return (
    <>
      <section
        className={`text-gray-200 container px-6 sticky top-0 z-20`}
        style={{
          background: `linear-gradient(to right, ${"#f03d3d"}, black)`,
        }}
      >
        {/* todo left section */}
        <div className='w-full flex justify-between items-center m-auto '>
          <div className='container w-1/2 flex flex-col gap-5 '>
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
                <img src='' alt='' className='w-12' />
                <div className='flex flex-col items-center'>
                  <h1 className='text-5xl font-bold'>100%</h1>
                  <p>Inventory Accuracy</p>
                </div>
              </div>
              {/* right num */}
              <div className='flex items-center gap-5'>
                <img src='' alt='' className='w-12' />
                <div className='flex flex-col items-center'>
                  <h1 className='text-5xl font-bold'>100%</h1>
                  <p className='text-lg  tracking-wider'>Inventory Accuracy</p>
                </div>
              </div>
            </div>
          </div>
          {/* todo right section */}
          <div className='w-1/2 '>
            <img src={aboutData.image} alt='aboutPage3' className='object-cover' />
          </div>
        </div>
      </section>
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
              label='Paragraph 1'
              value={aboutData.para1 || ""}
              onChange={(e) => setAboutData({ ...aboutData, para1: e.target.value })}
              rows={3}
            />

            <Textarea
              label='Paragraph 2'
              value={aboutData.para2 || ""}
              onChange={(e) => setAboutData({ ...aboutData, para2: e.target.value })}
              rows={3}
            />

            <Input
              label='Number 1'
              type='text'
              value={aboutData.num1 || ""}
              onChange={(e) => setAboutData({ ...aboutData, num1: e.target.value })}
            />

            <Input
              label='Number 2'
              type='text'
              value={aboutData.num2 || ""}
              onChange={(e) => setAboutData({ ...aboutData, num2: e.target.value })}
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
                label='Paragraph 1 Color'
                type='color'
                value={aboutData.para1Color || ""}
                onChange={(e) => {
                  setAboutData({ ...aboutData, para1Color: e.target.value });
                }}
              />
              <Input
                label='Paragraph 2 Color'
                type='color'
                value={aboutData.para2Color || ""}
                onChange={(e) => {
                  setAboutData({ ...aboutData, para2Color: e.target.value });
                }}
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
    </>
  );
};

export default AboutPage3;
