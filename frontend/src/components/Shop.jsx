import { Button } from "@material-tailwind/react";
import React from "react";
import { ListBulletIcon, PhotoIcon } from "@heroicons/react/24/solid";

const Shop = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
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
      <div className='flex gap-4'>
        <div className='w-1/4'>
          <div className='bg-white rounded-lg shadow p-4'>
            <h3 className='font-semibold mb-4'>Filters</h3>
            <div className='space-y-4'>
             
              <div>
                <h4 className='font-medium mb-2'>Brand</h4>
                <div className='space-y-2'>
                  <label className='flex items-center'>
                    <input type='checkbox' className='mr-2' />
                    Brand 1
                  </label>
                  <label className='flex items-center'>
                    <input type='checkbox' className='mr-2' />
                    Brand 2
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-3/4'>
          {/* Product grid or list will go here */}
          <div className='grid grid-cols-3 gap-4'>{/* Add your product cards here */}</div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
