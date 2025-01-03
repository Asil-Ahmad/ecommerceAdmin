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

        <label
          htmlFor='thumbnail'
          className={`items-center flex justify-between border-2 ${
            formData.thumbnail ? "border-black" : ""
          } p-2 cursor-pointer rounded-lg`}
        >
          {formData.thumbnail ? (
            <img
              src={URL.createObjectURL(formData.thumbnail)}
              alt={formData.name}
              className='w-[100px] h-[100px] object-contain '
            />
          ) : (
            <PhotoIcon width={100} />
          )}
          <span className='px-2 py-2 bg-gray-200 rounded-lg text-sm'>Upload image</span>
        </label>
        <input
          label='Thumbnail'
          type='file'
          id='thumbnail'
          accept='.jpg,.jpeg,.png'
          hidden
          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files[0] })}
        />
        <Button onClick={handleAddCategory}>Add New Category</Button>
      </div>
    </CardBody>
  );
};

export default CategoryData;
