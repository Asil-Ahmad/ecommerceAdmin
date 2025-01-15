import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { headphones } from "../assets/homepage";

const ProductCards = ({ product }) => {
  const { salePrice, saleStart, images, name, price } = product;
  return (
    <Card className='w-[23rem] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'>
      <CardHeader
        shadow={false}
        floated={false}
        className='h-[20rem] mx-0 mt-0 rounded-none relative'
      >
        <img
          src={product.images[0].url}
          alt='product'
          className=' object-cover object-center hover:scale-105 transition-all duration-300 cursor-pointer'
        />

        {salePrice && saleStart && new Date(saleStart) <= new Date() && (
          <div className='absolute top-[1rem] right-[-9rem] bg-red-500 text-white px-4 w-full flex justify-center  py-1 shadow-md transform rotate-45'>
            <span className='font-semibold'>On Sale!</span>
          </div>
        )}
      </CardHeader>
      <CardBody>
        <div className='flex items-center justify-between mb-2'>
          <Typography color='blue-gray' className='font-medium'>
            {product.name}
          </Typography>
          <div className='flex gap-2 items-center flex-row-reverse'>
            {salePrice && saleStart && new Date(saleStart) <= new Date() ? (
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
              <Typography variant='small' color='blue-gray' className='font-normal'>
                ₹{price}.00
              </Typography>
            )}
          </div>
        </div>
        <Typography variant='small' color='gray' className='font-normal opacity-75'>
          Product description goes here. This is a sample text that can be replaced with actual
          product details.
        </Typography>
      </CardBody>
      <CardFooter className='pt-0'>
        <Button
          ripple={false}
          fullWidth={true}
          className='bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100'
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCards;
