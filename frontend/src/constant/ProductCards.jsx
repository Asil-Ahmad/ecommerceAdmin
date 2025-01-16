import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import ProductModel from "./ProductModel";
import { Link } from "react-router-dom";

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
      <Card className='w-full'>
        <CardHeader
          shadow={false}
          floated={false}
          className='h-[16rem] mx-0 mt-0 rounded-none relative group'
        >
          <Link to={`/product/${product._id}`}>
            <img
              src={images[0].url}
              alt='product'
              className=' object-cover object-center group-hover:scale-105 group transition-all duration-300 cursor-pointer'
            />

            {salePrice && (
              <div
                className='absolute top-[1rem] right-[-7rem] bg-red-500 text-white px-4 w-full flex justify-center  py-1 shadow-md transform rotate-45
            group-hover:brightness-120 group-hover:py-2  active:opacity-100 outline-none duration-300 '
              >
                <span className='font-semibold text-sm'>On Sale!</span>
              </div>
            )}
          </Link>

          <button
            className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white/60 backdrop-blur-sm w-full py-2 
                                            opacity-0 group-hover:opacity-100 transition-all duration-300  text-blue-gray-900 font-semibold'
            onClick={handleOpen}
          >
            Quick View
          </button>
        </CardHeader>
        <Link to={`/product/${product._id}`} className='cursor-pointer'>
          <CardBody>
            <div className='flex items-center justify-between mb-2'>
              <Typography color='blue-gray' variant='h6' className='font-medium truncate'>
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
        </Link>
        <CardFooter className='pt-0'>
          <Button
            ripple={false}
            fullWidth={true}
            variant="outlined"
            className='  text-blue-gray-900  shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100'
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
      {open ? (
        <ProductModel product={product} open={open} setOpen={setOpen} removeTags={removeTags} />
      ) : (
        ""
      )}
    </>
  );
};

export default ProductCards;
