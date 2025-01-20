import React from "react";
import { Typography, Button, CardBody, Input, Textarea } from "@material-tailwind/react";
import { PhotoIcon } from "@heroicons/react/24/solid";

const CategoryData = ({ formData, setFormData, handleAddCategory }) => {
  return (
    <CardBody className='w-[25%] bg-gray-50 rounded-l-lg'>
      <Typography variant='h6' color='blue-gray' className='mb-4'>
        Add new Category
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
          placeholder='Enter category slug'
          className='bg-white'
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        />
        <Textarea
          label='Description'
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <div className='relative border-2 border-dashed rounded-lg  p-4 hover:border-gray-400 transition-all duration-300'>
          <label htmlFor='thumbnail' className='flex cursor-pointer w-full justify-center'>
            {formData.thumbnail ? (
              <img
                src={URL.createObjectURL(formData.thumbnail)}
                alt='Product Image'
                className='w-12 h-12 object-cover object-top'
              />
            ) : (
              <div className='text-center w-full h-12 content-center'>
                <p className='text-sm text-gray-500'>Click or drag image to upload</p>
              </div>
            )}
          </label>
          <input
            type='file'
            accept='image/*'
            id='thumbnail'
            hidden
            required
            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files[0] })}
          />
        </div>
        <Button onClick={handleAddCategory}>Add New Category</Button>
      </div>
    </CardBody>
  );
};

export default CategoryData;
