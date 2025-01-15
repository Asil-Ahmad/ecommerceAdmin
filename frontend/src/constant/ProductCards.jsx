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

const ProductCards = () => {
  return (
    <Card className='w-[23rem] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'>
      <CardHeader shadow={false} floated={false} className='h-[20rem] mx-0 mt-0 rounded-none'>
        <img src={headphones} alt='product' className='w-full h-full  object-cover hover:scale-105 transition-all duration-300 cursor-pointer' />
      </CardHeader>
      <CardBody>
        <div className='flex items-center justify-between mb-2'>
          <Typography color='blue-gray' className='font-medium'>
            Product Name
          </Typography>
          <Typography color='blue-gray' className='font-medium'>
            $95.00
          </Typography>
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
