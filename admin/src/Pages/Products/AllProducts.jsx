import React, { useState, useEffect } from "react";
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

const TABLE_HEAD = ["Image", "Name", "SKU", "Stock", "Price", "Categories", "Tags", "Date", "Edit"];

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:4000/api/product/list-products");
    const { products } = response.data;
    console.log(products);
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
            All (1)
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
            {products.map(
              ({ name, images, price, date, status, account, accountNumber, expiry }, index) => {
                const isLast = index === products.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Avatar
                        src={images[0]}
                        alt={name}
                        size='md'
                        className='border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1'
                      />
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        TBHU-102
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className='w-max'>
                        <Chip
                          size='sm'
                          variant='ghost'
                          value={`${name} (${name.length})`}
                          color={
                            name === "In Stock"
                              ? "green"
                              : name === "Low In Stock"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {price}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        Categories
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        #tag
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content='Edit User'>
                        <IconButton variant='text'>
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
