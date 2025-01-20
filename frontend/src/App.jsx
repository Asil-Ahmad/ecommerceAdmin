import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Homepage from "./layout/Homepage";
import Shop from "./components/Shop";
import Home from "./components/Home";
import ProductPage from "./components/ProductPage";
import About from "./components/About";

// todo Add routes from backend

const App = () => {
  return (
    <div className=''>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/about' element={<About />} />
        <Route path='/product/:_id' element={<ProductPage />} />
        <Route path='*' element={<Home />} /> // todo Add 404 page
      </Routes>
    </div>
  );
};

export default App;
