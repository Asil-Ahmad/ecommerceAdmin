import React, { useState, useRef, useContext } from "react";
import { Card, CardHeader, Typography, CardBody } from "@material-tailwind/react";
import TextEditor from "../../constant/TextEditor";
import MiniSidebar from "./Sidebar/AddProductSidebar";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";
import { toast } from "react-toastify";
import ProductData from "./Sidebar/ProductData";
import Loader from "../../constant/Loader";
import AddProductSidebar from "./Sidebar/AddProductSidebar";

const AddProduct = () => {
  const { backendURL } = useContext(ShopContext);
  //TextEditor
  const editor = useRef(null);
  //!start from here
  const [name, setName] = useState("Test");
  const [description, setDescription] = useState("Testing description");
  const [sku, setSku] = useState("THS-112");

  //-------------- Image states---------------------
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [altText1, setAltText1] = useState("");
  const [altText2, setAltText2] = useState("");
  const [altText3, setAltText3] = useState("");
  const [altText4, setAltText4] = useState("");

  //-------------------------------------------------
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("");
  const [subCategory, setSubCategory] = useState("T-shirt");
  const [category, setCategory] = useState("T-shirt");
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const productData = {
    name,
    description,
    price,
    setPrice,
    salePrice,
    setSalePrice,
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
    altText1,
    setAltText1,

    image2,
    setImage2,
    altText2,
    setAltText2,

    image3,
    setImage3,
    altText3,
    setAltText3,

    image4,
    setImage4,
    altText4,
    setAltText4,

    sku,
    setSku,

    stock,
    setStock,
  };
  console.log(productData);

  // Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append basic details
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("selectedCategories", selectedCategories); // Assuming multiple categories selected
      formData.append("salePrice", salePrice);
      formData.append("stock", stock);

      formData.append("sku", sku);
      // formData.append("subCategory", subCategory);
      // formData.append("sizes", JSON.stringify(sizes)); // Sizes should be a JSON string
      // formData.append("newCategory", newCategory); // For adding a new category

      // Append images
      if (image1) formData.append("image1", image1);
      if (image1) formData.append("altText1", altText1);

      if (image2) formData.append("image2", image2);
      if (image2) formData.append("altText2", altText2);

      if (image3) formData.append("image3", image3);
      if (image3) formData.append("altText3", altText3);

      if (image4) formData.append("image4", image4);
      if (image4) formData.append("altText4", altText4);

      // Make API call
      const response = await axios.post("http://localhost:4000/api/product/add-product", formData);

      // const response = await axios.post(`${backendURL}/api/product/add-products`, formData, {
      //   // headers: {
      //   //   token, // Assuming token is stored in state or context
      //   //   "Content-Type": "multipart/form-data", // Required for file uploads
      //   // },
      // });

      // Handle response
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data);

        // Reset form states after successful submission
        // setName("");
        // setDescription("");
        // setImage1("");
        // setImage2("");
        // setImage3("");
        // setImage4("");
        // setCategory([]);
        // setNewCategory("");
        // setSelectedCategories([]);
        // setPrice("");
        // setSizes([]);
      } else {
        toast.error(response.data.message || "An error occurred");
        console.log("An error occured");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading spinner
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

  return loading ? (
    <Loader />
  ) : (
    <>
      <Card className='h-screen w-full  '>
        <CardHeader floated={false} shadow={false} className='rounded-none'>
          <div className='mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center mt-2'>
            <Typography variant='h5' color='blue-gray'>
              Add new Product
            </Typography>
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
            <div className='border border-black  rounded-lg'>
              <div className='flex items-center gap-5 p-3 mb-2'>
                <Typography variant='h6' className='py-2 relative'>
                  Product Data -
                </Typography>

                <select label='Product Type' className='border border-black p-2 rounded-lg'>
                  <option>Simple product</option>
                  <option>Grouped product</option>
                  <option>External/Affiliate product</option>
                  <option>Variable product</option>
                </select>
              </div>
              <hr />
              <ProductData productData={productData} />
            </div>
          </div>
        </CardBody>
      </Card>
      <AddProductSidebar
        handleAddProduct={handleAddProduct}
        handleAddCategory={handleAddCategory}
        handleCheckboxChange={handleCheckboxChange}
        productData={productData}
        title='Publish'
      />
    </>
  );
};

export default AddProduct;
