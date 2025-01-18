import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { ListBulletIcon, PhotoIcon } from "@heroicons/react/24/solid";
import Sidebar from "./Sidebar";
import ProductCards from "../constant/ProductCards";
import { ShopContext } from "../context/ShopContext";
import { useGetProductsQuery } from "../services/TMDB";


const Shop = () => {
  // const { products } = useContext(ShopContext);
  const { data, error, isFetching } = useGetProductsQuery();
  console.log("Redux data", data?.products);

  if (isFetching) {
    return (
      <h1 className="text-4xl text-center m-auto h-screen font-thin content-center">Loading...</h1>
    )
  }

  //for error
  if (error) {
    return "An error has occurred.";
  }

  return (
    <div className='container flex items-start max-w-[1440px]  '>
      <Sidebar />
      <div className='w-full flex flex-col px-4'>
        {/* todo Filter Function */}
        <div className='flex justify-between items-center '>
          <div className='flex items-center space-x-4'>
            <input
              type='text'
              placeholder='Search products...'
              className='border rounded-lg px-4 py-2 w-64'
            />
            <select className='border rounded-lg px-4 py-2'>
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
            </select>
          </div>
          <div className='flex space-x-2'>
            <Button
              variant='outlined'
              size='sm'
              className='text-center content-center flex flex-col items-center'
            >
              <ListBulletIcon className='h-5 w-5 ' />
              List
            </Button>
            <Button
              variant='outlined'
              size='sm'
              className='text-center content-center flex flex-col items-center'
            >
              <PhotoIcon className='h-5 w-5 ' />
              Grid
            </Button>
          </div>
        </div>
        {/* todo Products Card */}
        <div className='grid grid-cols-3 grid-rows-1 gap-5  pt-5'>
          {data?.products?.map((product) => (
            <ProductCards key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
