import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Homepage from "./layout/Homepage";

const App = () => {
  return (
    <div className="">
      <Header />
      <Homepage />
    </div>
  );
};

export default App;
