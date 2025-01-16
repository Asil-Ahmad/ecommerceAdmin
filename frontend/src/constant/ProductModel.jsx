import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const ProductModel = ({ product, open, setOpen }) => {
  const { images } = product;
  return (
    <div className='fixed inset-0 z-10'>
      <div className='fixed inset-0 bg-black/70' onClick={() => setOpen(false)}></div>
      <div className='fixed top-1/2 left-1/2  w-[80%] h-[90%] p-4 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='flex gap-2 border h-[80%] mt-5 justify-center items-center rounded-lg  bg-white w-full py-5 px-4'>
          {1 < 2 ? (
            <div className='flex justify-between w-1/2'>
              {images.map((image) => (
                <div className='flex flex-col'>
                  <img src={image.url} alt='' className='w-16 h-16' />
                </div>
              ))}
              <img src={images[0].url} alt='Preview' className='w-full h-full object-contain' />
            </div>
          ) : (
            <div>
              <label htmlFor='image1'>
                <Button variant='outlined'>Select File</Button>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModel;
