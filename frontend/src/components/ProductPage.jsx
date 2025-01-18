import React from "react";
import { useParams } from "react-router-dom";

import { Button, Typography } from "@material-tailwind/react";
import { useGetSingleProductQuery } from "../services/TMDB";

const ProductPage = () => {
  const { _id } = useParams();
  const { data, error, isLoading } = useGetSingleProductQuery(_id);
  console.log("Product", data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Product Images Section */}
        <div className='space-y-4'>
          <div className='bg-white rounded-lg overflow-hidden'>
            <img
              src={data?.productInfo?.images?.[0].url}
              alt={data?.productInfo?.name}
              className='w-full h-[500px] object-contain'
            />
          </div>
          <div className='grid grid-cols-4 gap-2'>
            {data?.productInfo?.images?.map((image, index) => (
              <div key={index} className='bg-white rounded-lg overflow-hidden cursor-pointer'>
                <img
                  src={image.url}
                  alt={`${data?.productInfo?.name}-${index}`}
                  className='w-full h-24 object-contain hover:opacity-75 transition-opacity'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className='space-y-6'>
          <h1 className='text-3xl font-bold text-gray-900'>{data?.productInfo?.name}</h1>
          {data?.productInfo?.salePrice ? (
            <>
              <Typography
                variant='small'
                color='blue-gray'
                className='font-medium opacity-50 line-through'
              >
                ₹{data?.productInfo?.price}.00
              </Typography>
              <Typography variant='h5' color='blue-gray' className='font-bold'>
                ₹{data?.productInfo?.salePrice}.00
              </Typography>
            </>
          ) : (
            <Typography variant='h6' color='blue-gray' className='font-normal'>
              ₹{data?.productInfo?.price}.00
            </Typography>
          )}
          <div className='space-y-2'>
            <h3 className='text-lg font-medium text-gray-900'>Description</h3>
            <p className='text-gray-600'>{data?.productInfo?.description}</p>
          </div>
          <div className='space-y-2'>
            <h3 className='text-lg font-medium text-gray-900'>Category</h3>
            <p className='text-gray-600'>{data?.productInfo?.category}</p>
          </div>
          <Button variant='outlined' ripple='light'>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
