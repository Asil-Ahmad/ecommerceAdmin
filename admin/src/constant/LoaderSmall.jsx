import React from "react";
import { tailspin } from "ldrs";

tailspin.register();

export const LoaderSmall = () => {
  return (
    <div className=' container text-center content-center h-[75vh]'>
      <l-tailspin size='40' stroke='5' speed='0.9' color='black'></l-tailspin>
    </div>
  );
};


