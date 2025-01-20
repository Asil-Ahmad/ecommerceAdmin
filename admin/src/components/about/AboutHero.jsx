import React from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Card, CardBody, Typography, Input, Textarea, Button } from "@material-tailwind/react";

const AboutHero = () => {
  const { aboutData } = useContext(ShopContext);
  console.log(aboutData.color);

  return (
    <>
      <div
        key={aboutData._id}
        style={{
          background: `linear-gradient(to right, ${aboutData.bgColor}, black)`,
        }}
        className='mx-auto'
      >
        <div className='container mx-auto pt-10 px-20 flex justify-between gap-10 items-center h-[70vh]'>
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
            <img src={aboutData.image} alt='About' className='w-[50%]' />
          </div>
        </div>
      </div>

      {/* todo Form Edit */}

      <Card className='container mx-auto p-8'>
        <CardBody className='p-6'>
          <Typography variant='h2' className='text-2xl font-bold mb-6'>
            Edit Hero Section
          </Typography>
          <form className='space-y-6'>
            <Input
              label='Heading Text'
              type='text'
              value={aboutData.text}
              onChange={(e) => setAboutData({ ...aboutData, text: e.target.value })}
              className=''
            />

            <Textarea
              label='Paragraph'
              value={aboutData.para}
              onChange={(e) => setAboutData({ ...aboutData, para: e.target.value })}
              rows={3}
            />

            <Input
              label='Button Text'
              type='text'
              value={aboutData.buttonText}
              onChange={(e) => setAboutData({ ...aboutData, buttonText: e.target.value })}
            />

            <div className='max-w-11'>
              <Input
                label='Background Color'
                type='color'
                value={aboutData.bgColor}
                onChange={(e) => setAboutData({ ...aboutData, bgColor: e.target.value })}
                
              />
            </div>

            <div>
              <label htmlFor='image' className=' flex flex-col gap-3'>
                Select Image
                <img
                  src={aboutData.image}
                  alt='Preview'
                  className='w-32 h-32 object-cover rounded-lg'
                />
              </label>
              <input
                type='file'
                label='Image'
                id='image'
                accept='image/*'
                hidden
                onChange={(e) =>
                  setAboutData({ ...aboutData, image: URL.createObjectURL(e.target.files[0]) })
                }
              />
            </div>

            <Button type='submit' className='w-full'>
              Save Changes
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default AboutHero;
