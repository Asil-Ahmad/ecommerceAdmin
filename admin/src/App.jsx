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
import Category from "./Pages/Products/Category";
import EditCategory from "./Pages/Products/EditCategory";



const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex ${darkMode ? "dark" : ""} `}>
      <ToastContainer />
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
        <Route path='/categories' element={<Category />} />
        <Route path='/edit_category/:_id' element={<EditCategory />} />
      </Routes>
    </div>
  );
};

export default App;
