import React from "react";
import { tailspin } from "ldrs";

tailspin.register();

export const LoaderSmall = () => {
  return (
    <div className=' w-[25%] container text-center content-center h-[50vh]'>
      <l-tailspin size='40' stroke='5' speed='0.9' color='black'></l-tailspin>
    </div>
  );
};


