import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ShoppingCartIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const ProductModel = ({ product, open, setOpen, removeTags }) => {
  const { images,salePrice,price } = product;
  return (
    <div className='fixed inset-0 z-10'>
      <div className='fixed inset-0 bg-black/70' onClick={() => setOpen(false)}></div>
      <div className='fixed top-1/2 left-1/2  w-[80%] h-[90%] p-4 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='flex gap-2 border h-[80%] mt-5  items-center rounded-lg  bg-white relative w-full py-5 px-4'>
          <XMarkIcon
            onClick={() => setOpen(false)}
            className='w-6 absolute cursor-pointer hover:scale-110 transition-all duration-150 top-2 right-2'
          />
          {/* todo Left Section */}
          <div className='flex justify-between w-1/2 gap-5'>
            <div className='flex flex-col  justify-center'>
              {images.map((image) => (
                <img src={image.url} alt='' className='w-16 h-16 object-contain' />
              ))}
            </div>
            <img src={images[0].url} alt='Preview' className='w-full h-full object-contain' />
          </div>
          {/* todo Right Section */}
          <div className='flex flex-col items-center w-1/2 gap-4'>
            <Typography variant='h6' color='blue-gray'>
              {product.name}
            </Typography>
            <Typography variant='body1' color='blue-gray'>
              {removeTags(product.description)}
            </Typography>

            {salePrice ? (
              <>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-medium opacity-50 line-through'
                >
                  ₹{price}.00
                </Typography>
                <Typography variant='h5' color='blue-gray' className='font-bold'>
                  ₹{salePrice}.00
                </Typography>
              </>
            ) : (
              <Typography variant='h6' color='blue-gray' className='font-normal'>
                ₹{price}.00
              </Typography>
            )}
            <Button variant='outlined' color='brown' size='sm'>
              Product Details
            </Button>
            <Button variant='' size='sm' className='flex items-center gap-2'>
              <ShoppingCartIcon className='h-5 w-5' />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModel;
