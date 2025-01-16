import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { ListBulletIcon, PhotoIcon } from "@heroicons/react/24/solid";
import Sidebar from "./Sidebar";
import ProductCards from "../constant/ProductCards";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:4000/api/product/list-products");
    const { products } = response.data;
    setProducts(products); // Use setFilterProducts to update the state
    console.log(products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

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
          {products.map((product) => (
            <ProductCards key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
