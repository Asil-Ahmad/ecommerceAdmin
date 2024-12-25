import React from "react";
import { tailspin } from "ldrs";

tailspin.register();

const Loader = () => {
  return (
    <div className='container text-center content-center h-[100vh]'>
      <l-tailspin size='40' stroke='5' speed='0.9' color='black'></l-tailspin>
    </div>
  );
};

export default Loader;
