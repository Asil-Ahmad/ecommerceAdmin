import { createContext } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  // const fetchProducts = async () => {
  //   const response = await axios.get("http://localhost:4000/api/product/list-products");
  //   const { products } = response.data;
  //   setProducts(products); // Use setFilterProducts to update the state
  //   // console.log(products);
  // };
  // console.log(products);
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const navigate = useNavigate();
  const test = "Working";
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const value = { navigate, test, backendURL, products };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
