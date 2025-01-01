import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Input, Button, Typography, Textarea } from "@material-tailwind/react";

const EditCategory = () => {
  const { _id } = useParams();
  console.log(_id);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    thumbnail: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className='flex w-full justify-center items-center min-h-screen bg-gray-100'>
      <Card color='transparent' shadow={false} className='p-8 bg-white'>
        <Typography variant='h4' color='blue-gray'>
          Edit Category
        </Typography>
        <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96' onSubmit={handleSubmit}>
          <div className='mb-4 flex flex-col gap-6'>
            <Input
              size='lg'
              label='Name'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              size='lg'
              label='Slug'
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
            <Textarea
              label='Description'
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <Input
              type='file'
              label='Thumbnail'
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files[0] })}
            />
          </div>
          <Button className='mt-6' fullWidth type='submit'>
            Update Category
          </Button>
        </form>
      </Card>
    </div>
  );
};
export default EditCategory;
