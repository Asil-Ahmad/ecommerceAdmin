import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Name", "Status", "Created Date", "Actions"];

const Category = () => {
  const [categories, setCategories] = useState([]);
  const { backendURL } = useContext(ShopContext);

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

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/category/list-categories`);
      const { categories } = response.data;
      setCategories(categories);
      console.log(categories);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [backendURL]);

  const removeCategory = async (id) => {
    console.log(id);

    try {
      const response = await axios.post(`${backendURL}/api/category/remove-category`, { id });
      if (response.data) {
        toast.success(response.data.message);
        await fetchCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className='h-full w-full'>
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
      </CardHeader>
      <CardBody className='overflow-scroll px-0'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal leading-none opacity-70'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map(({ _id, name, status, createdAt }, index) => (
              <tr key={_id} className='even:bg-blue-gray-50/50'>
                <td className='p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal'>
                    {name}
                  </Typography>
                </td>
                <td className='p-4'>
                  <Chip
                    variant='ghost'
                    size='sm'
                    value={status}
                    color={status === "active" ? "green" : "blue-gray"}
                  />
                </td>
                <td className='p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal'>
                    {formatTimestamp(createdAt)}
                  </Typography>
                </td>
                <td className='p-4'>
                  <div className='flex gap-2'>
                    <Tooltip content='Edit Category'>
                      <IconButton variant='text' color='blue-gray'>
                        <PencilIcon className='h-4 w-4' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content='Delete Category'>
                      <IconButton variant='text' color='red' onClick={() => removeCategory(_id)}>
                        <TrashIcon className='h-4 w-4' />
                      </IconButton>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          Page 1 of 1
        </Typography>
        <div className='flex gap-2'>
          <Button variant='outlined' color='blue-gray' size='sm'>
            Previous
          </Button>
          <Button variant='outlined' color='blue-gray' size='sm'>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Category;
