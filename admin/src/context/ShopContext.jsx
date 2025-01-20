import { createContext } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();
  //Fetch About API
  const [aboutData, setAboutData] = useState([]);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/aboutPage/get-aboutPage");
      const { aboutPage } = response.data;
      console.log("About Data", aboutPage[0]);
      setAboutData(aboutPage[0]);
    } catch (error) {
      console.log("Error fetching About data", error);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  const test = "Working";
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const value = { navigate, test, backendURL, aboutData };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
