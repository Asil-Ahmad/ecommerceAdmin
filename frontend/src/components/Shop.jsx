import { Button } from "@material-tailwind/react";
import React from "react";
import { ListBulletIcon, PhotoIcon } from "@heroicons/react/24/solid";
import Sidebar from "./Sidebar";

const Shop = () => {
  return (
    <div className=' flex items-start '>
      <Sidebar />
      <div className='flex w-full justify-between items-center px-4'>
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
     
    </div>
  );
};

export default Shop;
