import { createContext } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();
  //Fetch About API


  const test = "Working";
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const value = { navigate, test, backendURL };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
