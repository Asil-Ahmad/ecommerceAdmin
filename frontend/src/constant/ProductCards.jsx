import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";


const ProductCards = ({ product }) => {
  const { salePrice, saleStart, images, name, description, price } = product;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  //! Remove HTML tags from description
  const removeTags = (str) => {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>|&nbsp;)/gi, "");
  };

  return (
    <>
      <Card className='w-[23rem] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'>
        <CardHeader
          shadow={false}
          floated={false}
          className='h-[20rem] mx-0 mt-0 rounded-none relative group'
        >
          <img
            src={images[0].url}
            alt='product'
            className=' object-cover object-center group-hover:scale-105 group transition-all duration-300 cursor-pointer'
          />

          {salePrice && (
            <div
              className='absolute top-[1rem] right-[-9rem] bg-red-500 text-white px-4 w-full flex justify-center  py-1 shadow-md transform rotate-45
                                                            group-hover:brightness-120 group-hover:pt-2  active:opacity-100 outline-none duration-300 '
            >
              <span className='font-semibold'>On Sale!</span>
            </div>
          )}

          <button
            className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white/60 backdrop-blur-sm w-full py-2 
                                            opacity-0 group-hover:opacity-100 transition-all duration-300  text-blue-gray-900 font-semibold'
            onClick={handleOpen}
          >
            Quick View
          </button>
        </CardHeader>
        <CardBody>
          <div className='flex items-center justify-between mb-2'>
            <Typography color='blue-gray' className='font-medium'>
              {name}
            </Typography>
            <div className='flex gap-2 items-center flex-row-reverse'>
              {salePrice ? (
                <>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-medium opacity-50 line-through'
                  >
                    ₹{price}.00
                  </Typography>
                  <Typography variant='h5' color='blue-gray' className='font-bold'>
                    ₹{salePrice}.00
                  </Typography>
                </>
              ) : (
                <Typography variant='h6' color='blue-gray' className='font-normal'>
                  ₹{price}.00
                </Typography>
              )}
            </div>
          </div>
          <Typography variant='small' color='gray' className='font-normal opacity-75'>
            {removeTags(description)}
          </Typography>
        </CardBody>
        <CardFooter className='pt-0'>
          <Button
            ripple={false}
            fullWidth={true}
            className='bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100'
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
      {open ? (
        <div className='fixed inset-0 z-10'>
          <div className='fixed inset-0 bg-black/70' onClick={() => setOpen(false)}></div>
          <div className='fixed top-1/2 left-1/2 bg-white border shadow-2xl border-gray-300 z-10 w-[90%] h-[90%] p-4 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='flex justify-between items-center'>
              <Typography variant='h5' color='blue-gray'>
                Product Image
              </Typography>
              
            </div>

            <hr />

            <div className='flex gap-2 border h-[80%] mt-5 justify-center items-center rounded-lg  bg-white w-full py-5 px-4'>
              {1 < 2 ? (
                <div className='w-full h-full grid grid-cols-3 grid-rows-1 gap-4 '>
                  <div className='col-span-2 bg-gray-50 p-2 rounded-lg'>
                    <img src={images[0].url} alt='Preview' className='w-52 h-52 object-contain' />
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor='image1'>
                    <Button variant='outlined'>Select File</Button>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductCards;
