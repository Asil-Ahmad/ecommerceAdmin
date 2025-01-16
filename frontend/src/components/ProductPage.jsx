import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button,Typography } from "@material-tailwind/react";

const ProductPage = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState("");
  console.log(_id);

  const fetchProducts = async () => {
    const response = await axios.post("http://localhost:4000/api/product/single-product", { _id });
    const { productInfo } = response.data;
    setProduct(productInfo);
  };
  console.log(product?.images?.[0].url);

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Product Images Section */}
        <div className='space-y-4'>
          <div className='bg-white rounded-lg overflow-hidden'>
            <img
              src={product?.images?.[0].url}
              alt={product.name}
              className='w-full h-[500px] object-contain'
            />
          </div>
          <div className='grid grid-cols-4 gap-2'>
            {product?.images?.map((image, index) => (
              <div key={index} className='bg-white rounded-lg overflow-hidden  cursor-pointer'>
                <img
                  src={image.url}
                  alt={`${product.name}-${index}`}
                  className='w-full h-24 object-contain hover:opacity-75 transition-opacity'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className='space-y-6'>
          <h1 className='text-3xl font-bold text-gray-900'>{product.name}</h1>
          {product.salePrice ? (
            <>
              <Typography
                variant='small'
                color='blue-gray'
                className='font-medium opacity-50 line-through'
              >
                ₹{product.price}.00
              </Typography>
              <Typography variant='h5' color='blue-gray' className='font-bold'>
                ₹{product.salePrice}.00
              </Typography>
            </>
          ) : (
            <Typography variant='h6' color='blue-gray' className='font-normal'>
              ₹{product.price}.00
            </Typography>
          )}
          <div className='space-y-2'>
            <h3 className='text-lg font-medium text-gray-900'>Description</h3>
            <p className='text-gray-600'>{product.description}</p>
          </div>
          <div className='space-y-2'>
            <h3 className='text-lg font-medium text-gray-900'>Category</h3>
            <p className='text-gray-600'>{product.category}</p>
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
