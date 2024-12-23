"use client";
import React, { useState, useRef } from "react";

import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import TextEditor from "../../constant/TextEditor";
import MiniSidebar from "./Sidebar/Publish";

const AddProduct = () => {
  //TextEditor
  const editor = useRef(null);
  // const [content, setContent] = useState("");
  //!start from here
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Image states
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("T-shirt");
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const productData = {
    name,
    description,
    price,
    categories,
    setCategories,
    subCategory,
    newCategory,
    setNewCategory,
    selectedCategories,
    setSelectedCategories,
    sizes,
    image1,
    setImage1,
    image2,
    setImage2,
    image3,
    setImage3,
    image4,
    setImage4,
  };
  console.log(name, description, "Selected Category:-", selectedCategories, subCategory, sizes);

  //Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      images.forEach((image, index) => {
        formData.append("images", image); // 'images' is the field name expected by the backend
      });
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));

      const response = await axios.post(backendURL + "/api/product/add-products", formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImages([]);
        setPrice("");
        setSizes([]);
      } else {
        toast.error("An error occured");
      }
      response.data;
    } catch (error) {
      toast.error("Invalid Admin");
    } finally {
      setLoading(false); // Automatically stops loading after the request completes (success or error)
    }
  };

  //Add new category
  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories((prev) => [...prev, newCategory.trim()]);
      setNewCategory(""); // Clear the input field
    }
  };

  //Select Category
  const handleCheckboxChange = (category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((item) => item !== category) // Remove if already selected
          : [...prev, category] // Add if not selected
    );
  };

  return (
    <>
      <Card className='h-screen w-full  '>
        <CardHeader floated={false} shadow={false} className='rounded-none'>
          <div className='mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center mt-2'>
            <div>
              <Typography variant='h5' color='blue-gray'>
                Add new Product
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className='overflow-scroll '>
          <div className='w-full flex flex-col gap-7'>
            {/* todo Product Name */}
            <input
              placeholder='Product Name'
              className='peer w-full bg-transparent placeholder:text-xl placeholder:text-slate-400 text-slate-700 text-xl 
               border border-black rounded-md px-3 py-3 transition duration-300 ease  hover:border-slate-300 shadow-sm focus:shadow'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* todo Product Description */}
            <div className='border border-black p-3 rounded-lg'>
              <Typography variant='h6' className='py-2 relative'>
                Product Description
              </Typography>
              <TextEditor editor={editor} content={description} setContent={setDescription} />
            </div>
            {/* todo Product Data */}
            <div className='border border-black p-3 rounded-lg'>
              <Typography variant='h6' className='py-2 relative'>
                Product Data
              </Typography>
             
            </div>
          </div>
        </CardBody>
      </Card>
      <MiniSidebar
        handleAddProduct={handleAddProduct}
        handleAddCategory={handleAddCategory}
        handleCheckboxChange={handleCheckboxChange}
        productData={productData}
      />
    </>
  );
};

export default AddProduct;
