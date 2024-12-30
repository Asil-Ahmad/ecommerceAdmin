import React, { useState, useRef, useContext, useEffect } from "react";
import { Card, CardHeader, Typography, CardBody } from "@material-tailwind/react";
import TextEditor from "../../constant/TextEditor";
import MiniSidebar from "./Sidebar/AddProductSidebar";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";
import { toast } from "react-toastify";
import ProductData from "./Sidebar/ProductData";
import Loader from "../../constant/Loader";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { backendURL } = useContext(ShopContext);
  const { _id } = useParams();
  //TextEditor
  const editor = useRef(null);
  //!start from here
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [short_Description, setShortDescription] = useState("");
  const [sku, setSku] = useState("");

  //-------------- Image states---------------------
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [altText1, setAltText1] = useState("");
  const [altText2, setAltText2] = useState("");
  const [altText3, setAltText3] = useState("");
  const [altText4, setAltText4] = useState("");

  //-------------------Categories------------------------------
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  //-------------------Tags------------------------------
  const [tags, setTags] = useState("");

  const [price, setPrice] = useState("");
  //sale price,start end
  const [salePrice, setSalePrice] = useState("");
  const [saleStart, setSaleStart] = useState("");
  const [saleEnd, setSaleEnd] = useState("");
  //weight,dimenstion
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState({
    dlength: "",
    dwidth: "",
    dheight: "",
  });

  const [stock, setStock] = useState(2);

  const [category, setCategory] = useState("T-shirt");
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/product/update", { _id });

      const { updatedProduct } = response.data;
      console.log("Updated Product", updatedProduct);
      setName(updatedProduct.name || "");
      setDescription(updatedProduct.description || "");
      setShortDescription(updatedProduct.short_description || "");
      setPrice(updatedProduct.price || "");
      setSalePrice(updatedProduct.salePrice || "");
      setSku(updatedProduct.sku || "");
      setStock(updatedProduct.stock || "");
      setSalePrice(updatedProduct.salePrice || "");
      setSelectedCategories(updatedProduct.categories || "");
      setImage1(updatedProduct.images[0].url);
      setImage2(updatedProduct.images[1].url);
      setImage3(updatedProduct.images[2].url);
      setImage4(updatedProduct.images[3].url);
      setWeight(updatedProduct.weight || "");
      setDimensions({
        dlength: updatedProduct.dimensions.dlength || "",
        dwidth: updatedProduct.dimensions.dwidth || "",
        dheight: updatedProduct.dimensions.dheight || "",
      });
      setSaleStart(updatedProduct.saleStart || "");
      setSaleEnd(updatedProduct.saleEnd || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const productData = {
    name,
    description,
    short_Description,
    setShortDescription,
    price,
    setPrice,
    salePrice,
    setSalePrice,
    saleStart,
    setSaleStart,
    saleEnd,
    setSaleEnd,
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
    weight,
    setWeight,
    dimensions,
    setDimensions,
  };
  //   console.log(productData);

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [name]: value,
    }));
  };

  // Add Product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append the product ID
      formData.append("_id", _id);

      // Append basic details
      formData.append("name", name || "");
      formData.append("description", description || "");
      formData.append("short_description", short_Description || "");
      formData.append("price", price);
      formData.append("selectedCategories", JSON.stringify(selectedCategories)); // Serialize array
      formData.append("salePrice", salePrice);

      if (saleStart && saleEnd) {
        formData.append("saleStart", saleStart || null); // Add saleStart
        formData.append("saleEnd", saleEnd || null);
      }
      formData.append("stock", stock);
      formData.append("sku", sku);

      // Append images
      if (image1) {
        formData.append("image1", image1);
        formData.append("altText1", altText1 || "");
      }
      if (image2) {
        formData.append("image2", image2);
        formData.append("altText2", altText2 || "");
      }
      if (image3) {
        formData.append("image3", image3);
        formData.append("altText3", altText3 || "");
      }
      if (image4) {
        formData.append("image4", image4);
        formData.append("altText4", altText4 || "");
      }

      formData.append("weight", weight || "");
      formData.append("dimensions[dheight]", dimensions.dheight || "");
      formData.append("dimensions[dlength]", dimensions.dlength || "");
      formData.append("dimensions[dwidth]", dimensions.dwidth || "");

      // Make API call
      const response = await axios.post("http://localhost:4000/api/product/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle response
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data);
      } else {
        toast.error(response.data.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update product");
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
              Edit Product
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
              <ProductData
                productData={productData}
                handleDimensionChange={handleDimensionChange}
              />
            </div>
            <div className='border border-black p-3 rounded-lg'>
              <Typography variant='h6' className='py-2 relative'>
                Product short Description
              </Typography>
              <TextEditor
                editor={editor}
                content={short_Description}
                setContent={setShortDescription}
              />
            </div>
          </div>
        </CardBody>
      </Card>
      <MiniSidebar
        handleUpdateProduct={handleUpdateProduct}
        handleAddCategory={handleAddCategory}
        handleCheckboxChange={handleCheckboxChange}
        productData={productData}
        title='Update'
      />
    </>
  );
};

export default EditProduct;
