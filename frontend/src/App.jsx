import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Homepage from "./layout/Homepage";
import Shop from "./components/Shop";
import Home from "./components/Home";

const App = () => {
  return (
    <div className=''>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>
    </div>
  );
};

export default App;