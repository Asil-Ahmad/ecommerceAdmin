import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@material-tailwind/react";
import { ListBulletIcon, PhotoIcon } from "@heroicons/react/24/solid";
import Sidebar from "./Sidebar";
import ProductCards from "../constant/ProductCards";

const Shop = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/products");
            const { products } = response.data;
            setProducts(products);
        } catch (error) {
            console.error(error.message);
        }
    }
  return (
    <div className=' flex items-start '>
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
            <Button variant='outlined' size='sm'>
              <ListBulletIcon className='h-4 w-4 mr-2' />
              List
            </Button>
            <Button variant='outlined' size='sm'>
              <PhotoIcon className='h-4 w-4 mr-2' />
              Grid
            </Button>
          </div>
        </div>
        {/* todo Products Card */}
        <div className='grid grid-cols-3 grid-rows-1 gap-4 pt-5'>
          <ProductCards />
        </div>
      </div>
    </div>
  );
};

export default Shop;
