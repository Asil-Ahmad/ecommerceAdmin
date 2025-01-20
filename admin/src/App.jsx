import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
//Products
import AllProducts from "./Pages/Products/AllProducts";
import AddProduct from "./Pages/Products/AddProduct";
//Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./Pages/Products/EditProduct";

import EditCategory from "./Pages/Products/EditCategory";
import Categories from "./Pages/Products/Categories";
import Headers from "./Pages/UI/Headers";
import Homepage from "./Pages/UI/Homepage";
import Carousel from "./Pages/UI/Carousel";
import Brands from "./Pages/Products/Brands";
import EditBrand from "./Pages/Products/EditBrand";
import About from "./Pages/UI/About";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex ${darkMode ? "dark" : ""} max-w-[1440px] m-auto `}>
      <ToastContainer position='bottom-left' />

      <Sidebar />

      {/* <button className='bg-black text-white' onClick={toggleDarkMode}>
        CLICK
      </button> */}
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Products Routes */}
        <Route path='/all_products' element={<AllProducts />} />
        <Route path='/add_new_product' element={<AddProduct />} />
        <Route path='/edit_product/:_id' element={<EditProduct />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/edit_category/:_id' element={<EditCategory />} />
        <Route path='/brands' element={<Brands />} />
        <Route path='/edit_brand/:_id' element={<EditBrand />} />

        {/* UI Routes */}
        <Route path='/headers' element={<Headers />} />
        <Route path='/homepage' element={<Homepage />} />
        <Route path='/carousel' element={<Carousel />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
