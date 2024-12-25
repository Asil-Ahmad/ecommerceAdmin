import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ChevronUpDownIcon, PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { ShopContext } from "../../context/ShopContext";

const TABLE_HEAD = ["Image", "Name", "SKU", "Stock", "Price", "Categories", "Tags", "Date", "Edit"];

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const { navigate } = useContext(ShopContext);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:4000/api/product/list-products");
    const { products } = response.data;
    // console.log(products);
    setAllProducts(products);
  };

  //set Date
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // Extract date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    // Extract time components
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format

    return `${year}/${month}/${day} at ${hours}:${minutes} ${ampm}`;
  };

  const removeProducts = async (id) => {
    try {
      const response = await axios.post("http://localhost:4000/api/product/remove", { id });

      if (response.data) {
        toast.success(response.data.message);
        await fetchProducts();
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(allProducts);

  return (
    <Card className='h-screen w-full '>
      <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center mt-2'>
          <div>
            <Typography variant='h5' color='blue-gray'>
              Products
            </Typography>
          </div>
          <div className='flex items-center justify-between w-full shrink-0 gap-2 md:w-max '>
            <div className='w-full md:w-72 '>
              <Input label='Search' icon={<MagnifyingGlassIcon className='h-5 w-5' />} />
            </div>
            <button className='py-[8px] px-3 rounded-md border border-gray-400 '>Search</button>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <Typography variant='paragraph' color='blue-gray'>
            All ({allProducts.length})
          </Typography>{" "}
          |
          <Typography variant='paragraph' color='blue-gray'>
            Published (1)
          </Typography>{" "}
          |
          <Typography variant='paragraph' color='blue-gray'>
            Sort (1)
          </Typography>
        </div>
      </CardHeader>
      <CardBody className='overflow-scroll px-0'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {/* todo remember to do changes of sort arrows */}
              {TABLE_HEAD.map((head) => (
                <th key={head} className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal leading-none opacity-70 flex'
                  >
                    {head}
                    <ChevronUpDownIcon strokeWidth={2} className='h-4 w-4' />
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allProducts.map(
              (
                {
                  _id,
                  name,
                  images,
                  price,
                  salePrice,
                  createdAt,
                  stock,
                  selectedCategories,

                  status,
                  account,
                  accountNumber,
                  expiry,
                },
                index
              ) => {
                const isLast = index === allProducts.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    {/* todo Image */}
                    <td className={classes}>
                      <Avatar
                        src={images.length > 0 ? images[0].url : ""}
                        alt={name}
                        size='md'
                        className='border border-blue-gray-50 bg-blue-gray-50/50 object-fill p-0'
                      />
                    </td>
                    {/* todo Name */}
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {name}
                      </Typography>
                    </td>
                    {/* todo SKU */}
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        TBHU-102
                      </Typography>
                    </td>
                    {/* todo Stock */}
                    <td className={classes}>
                      <div className='w-max flex items-baseline'>
                        {stock === 0 ? (
                          <p className='text-sm font-semibold text-gray-900'>Out of Stock</p>
                        ) : stock > 5 ? (
                          <p className='text-sm font-semibold text-green-500'>In Stock</p>
                        ) : (
                          <p className='text-sm font-semibold text-red-600'>Low In Stock</p>
                        )}
                        {stock === 0 ? "" : <p className='text-sm '>({stock})</p>}
                      </div>
                    </td>
                    <td className={classes}>
                      {salePrice ? (
                        <>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal line-through'
                          >
                            ₹{price}.00
                          </Typography>
                          <Typography variant='small' color='blue-gray' className='font-normal'>
                            ₹{salePrice}.00
                          </Typography>
                        </>
                      ) : (
                        <Typography variant='small' color='blue-gray' className='font-normal '>
                          ₹{price}.00
                        </Typography>
                      )}
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal line-through'
                      ></Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {selectedCategories}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        #tag
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal max-w-[5rem]'
                      >
                        {formatTimestamp(createdAt)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content='Edit User'>
                        <IconButton variant='text' onClick={() => navigate(`/edit_product/${_id}`)}>
                          <PencilIcon className='h-4 w-4' />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>

      {/* //todo Pagination */}
      <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <Button variant='outlined' size='sm'>
          Previous
        </Button>
        <div className='flex items-center gap-2'>
          <IconButton variant='outlined' size='sm'>
            1
          </IconButton>
          <IconButton variant='text' size='sm'>
            2
          </IconButton>
          <IconButton variant='text' size='sm'>
            3
          </IconButton>
          <IconButton variant='text' size='sm'>
            ...
          </IconButton>
          <IconButton variant='text' size='sm'>
            8
          </IconButton>
          <IconButton variant='text' size='sm'>
            9
          </IconButton>
          <IconButton variant='text' size='sm'>
            10
          </IconButton>
        </div>
        <Button variant='outlined' size='sm'>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AllProducts;
