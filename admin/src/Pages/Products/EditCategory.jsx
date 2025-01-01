import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, Input, Button, Typography, Textarea } from "@material-tailwind/react";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";
import { PhotoIcon } from "@heroicons/react/24/solid";

const EditCategory = () => {
  const { backendURL } = useContext(ShopContext);
  const { _id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    thumbnail: null,
  });

  const fetchCategory = async () => {
    console.log(_id);
    try {
      const response = await axios.post("http://localhost:4000/api/category/update-category", {
        _id,
      });
      const { updatedCategory } = response.data;

      setFormData({
        name: updatedCategory.name,
        slug: updatedCategory.slug,
        description: updatedCategory.description,
        thumbnail: updatedCategory.thumbnail,
      });
      console.log(updatedCategory);
    } catch (error) {
      console.error("Failed to fetch category", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className='flex w-full justify-center items-center min-h-screen bg-gray-100'>
      <Card color='transparent' shadow={false} className='p-8 bg-gray-50 h-full w-full'>
        <Typography variant='h4' color='blue-gray'>
          Edit Category
        </Typography>
        <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-[34rem]' onSubmit={handleSubmit}>
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
            <label
              htmlFor='thumbnail'
              className={`items-center flex justify-between border-2 ${
                formData.thumbnail ? "border-black" : ""
              } p-2 cursor-pointer rounded-lg`}
            >
              {formData.thumbnail ? (
                <img
                  src={
                    formData.thumbnail
                      ? formData.thumbnail
                      : URL.createObjectURL(formData.thumbnail)
                  }
                  alt={formData.name}
                  width={100}
                  className='object-cover'
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
