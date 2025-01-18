import React from "react";
import { Typography, Button, CardBody, Input, Textarea } from "@material-tailwind/react";
import { PhotoIcon } from "@heroicons/react/24/solid";

const BrandData = ({ formData, setFormData, handleAddCategory }) => {
  return (
    <CardBody className='w-[25%] bg-gray-50 rounded-l-lg'>
      <Typography variant='h6' color='blue-gray' className='mb-4'>
        Add new Brand
      </Typography>
      <div className='flex flex-col gap-4'>
        <Input
          label='Name'
          placeholder='Enter category name'
          className='bg-white'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label='Slug'
          placeholder='Enter slug'
          className='bg-white'
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        />
        <Textarea
          label='Description'
          
          className='bg-white'
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <div className='relative flex items-center justify-center w-full h-24 border border-dashed border-gray-300 rounded-lg'>
          <label
            htmlFor='thumbnail'
            className='absolute inset-0 flex flex-col items-center justify-center cursor-pointer'
          >
            <PhotoIcon className='h-8 w-8 text-gray-400' />
            <span className='text-sm text-gray-500'>Upload Thumbnail</span>
          </label>
          <input
            type='file'
            id='thumbnail'
            className='hidden'
            accept='image/*'
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files[0] })}
          />
        </div>
        <Button onClick={handleAddCategory} fullWidth>
          Add Category
        </Button>
      </div>
    </CardBody>
  );
};

export default BrandData;
