import React, { useState, useEffect, useRef, useContext } from "react";
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
  const [short_Description, setShortDescription] = useState("Testing short description");
  const [sku, setSku] = useState("THS-112");

  //-------------- Image states---------------------
  const [image1, setImage1] = useState("https://picsum.photos/200");
  const [image2, setImage2] = useState("https://picsum.photos/200");
  const [image3, setImage3] = useState("https://picsum.photos/200");
  const [image4, setImage4] = useState("https://picsum.photos/200");
  const [altText1, setAltText1] = useState("");
  const [altText2, setAltText2] = useState("");
  const [altText3, setAltText3] = useState("");
  const [altText4, setAltText4] = useState("");

  //-------------------Categories------------------------------
  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("T-shirt");
  //-------------------Tags------------------------------
  const [tags, setTags] = useState("tag1");

  const [price, setPrice] = useState("1100");
  //sale price,start end
  const [salePrice, setSalePrice] = useState("");
  const [isSaleEnabled, setIsSaleEnabled] = useState(false);
  const [saleStart, setSaleStart] = useState(null);
  const [saleEnd, setSaleEnd] = useState(null);
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
  const [featuredProduct, setFeaturedProduct] = useState(false);
  const [allBrands, setAllBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [name]: value,
    }));
    console.log(dimensions);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/category/list-categories`);
      const { categories } = response.data;
      setAllCategories(categories);
      // console.log(categories);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/brand/list-brands`);
      const { Brands } = response.data;
      setAllBrands(Brands);
      console.log(Brands);
    } catch (error) {
      console.error("Failed to fetch brands", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, [backendURL]);

  //Passing All Props here
  const productData = {
    name,
    description,
    price,
    setPrice,
    salePrice,
    setSalePrice,
    isSaleEnabled,
    setIsSaleEnabled,
    allCategories,
    setAllCategories,
    allBrands,
    setAllBrands,
    subCategory,
    newCategory,
    setNewCategory,
    selectedCategories,
    setSelectedCategories,
    sizes,
    //images and Alt
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

    tags,
    setTags,

    saleStart,
    setSaleStart,
    saleEnd,
    setSaleEnd,

    weight,
    setWeight,

    dimensions,
    setDimensions,
    featuredProduct,
    setFeaturedProduct,
  };
  console.log("this is data", featuredProduct);

  // Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append basic details
      formData.append("name", name);
      formData.append("description", description);
      formData.append("short_description", short_Description);
      formData.append("price", price);
      formData.append("selectedCategories", selectedCategories); // Assuming multiple categories selected
      formData.append("salePrice", salePrice);
      formData.append("stock", stock);
      formData.append("sku", sku);
      formData.append("tags", tags);
      formData.append("weight", weight);
      formData.append("featuredProduct", featuredProduct);

      if (dimensions.dheight || dimensions.dlength || dimensions.dwidth !== null) {
        formData.append("dimensions[dheight]", dimensions.dheight);
        formData.append("dimensions[dlength]", dimensions.dlength);
        formData.append("dimensions[dwidth]", dimensions.dwidth);
      }

      //sales
      if (saleStart && saleEnd) {
        formData.append("saleStart", saleStart || null); // Add saleStart
        formData.append("saleEnd", saleEnd || null);
      }

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

      // Handle response
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data.products);

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
  const handleAddCategory = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/category/add-category`, {
        name: newCategory,
        description: "",
      });

      if (response.data.success) {
        const addedCategory = response.data.category;
        setAllCategories((prev) => [...prev, addedCategory]);
        await fetchCategories(); // Fetch updated categories
        setNewCategory(""); // Clear the input field
      } else {
        console.error("Failed to add category:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      const { message } = error.response.data;
      toast.error(`${message}.. 
         Category already exists`);
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

  // // Select Brand
  // const handleBrandCheckboxChange = (brand) => {
  //   setAllBrands(
  //     (prev) =>
  //       prev.includes(brand)
  //         ? prev.filter((item) => item !== brand) // Remove if already selected
  //         : [...prev, brand] // Add if not selected
  //   );
  // };

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
              <ProductData
                productData={productData}
                handleDimensionChange={handleDimensionChange}
              />
            </div>

            {/* todo Product short Description */}
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
