import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, Input, Button, Typography, Textarea } from "@material-tailwind/react";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const EditBrand = () => {
  const { backendURL, navigate } = useContext(ShopContext);
  const { _id } = useParams();

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    slug: "",
    description: "",
    thumbnail: null,
  });

  const [loading, setLoading] = useState(false);

  const fetchBrand = async () => {
    console.log(_id);
    try {
      const response = await axios.post("http://localhost:4000/api/brand/update-brand", {
        _id,
      });
      const { updatedBrand } = response.data;

      setFormData({
        _id: updatedBrand._id,
        name: updatedBrand.name,
        slug: updatedBrand.slug,
        description: updatedBrand.description,
        thumbnail: updatedBrand.thumbnail,
      });
      console.log(updatedBrand);
    } catch (error) {
      console.error("Failed to fetch category", error);
    }
  };

  useEffect(() => {
    fetchBrand();
  }, [_id]);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("_id", formData._id);
      data.append("name", formData.name);
      data.append(
        "slug",
        formData.slug ? formData.name.toLowerCase().split(" ").join("-") : formData.slug
      );
      data.append(
        "description",
        formData.description === "" ? "No description provided" : formData.description
      );
      data.append("thumbnail", formData.thumbnail);

      const response = await axios.post("http://localhost:4000/api/brand/update-brand", data);
      console.log("Update Brand:", response.data);

      if (response.data) {
        toast.success(response.data.message);
        await fetchBrand();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        navigate("/categories");
      }, 2000);
    }
  };

  return (
    <div className='flex w-full justify-center items-center min-h-screen bg-gray-100'>
      <Card color='transparent' shadow={false} className='p-8 bg-gray-50 h-full w-full'>
        <Typography variant='h4' color='blue-gray'>
          Edit Brand
        </Typography>
        <form
          className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-[34rem]'
          onSubmit={handleUpdateCategory}
        >
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
                    typeof formData.thumbnail === "string"
                      ? formData.thumbnail
                      : URL.createObjectURL(formData.thumbnail)
                  }
                  alt={formData.name}
                  width={100}
                  height={100}
                  className='object-fill'
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
            Update Brand
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EditBrand;
