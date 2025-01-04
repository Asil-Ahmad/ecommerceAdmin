import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ChevronUpDownIcon, PencilIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
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
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 5;

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:4000/api/product/list-products");
    const { products } = response.data;
    setAllProducts(products); // Use setAllProducts to update the state
    setTotalProducts(response.data.totalProducts || products.length);
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
    fetchProducts(currentPage);
  }, [currentPage]);

  //todo Pagination

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalProducts / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Card className='h-screen w-full'>
      <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center mt-2'>
          <div>
            <Typography variant='h5' color='blue-gray'>
              Products
            </Typography>
          </div>
          <div className='flex items-center justify-between w-full shrink-0 gap-2 md:w-max'>
            <div className='w-full md:w-72'>
              <Input label='Search' icon={<MagnifyingGlassIcon className='h-5 w-5' />} />
            </div>
            <button className='py-[8px] px-3 rounded-md border border-gray-400'>Search</button>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <Typography variant='paragraph' color='blue-gray'>
            All ({allProducts.length})
          </Typography>{" "}
          |
          <Typography variant='paragraph' color='blue-gray'>
            Published ({allProducts.length})
          </Typography>{" "}
          |
          <Typography variant='paragraph' color='blue-gray'>
            Sort
          </Typography>
        </div>
      </CardHeader>
      <CardBody className='overflow-scroll px-0 h-full'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
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
            {allProducts
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map(
                (
                  {
                    _id,
                    name,
                    sku,
                    images,
                    price,
                    salePrice,
                    saleStart,
                    createdAt,
                    stock,
                    selectedCategories,
                    tags,
                  },
                  index
                ) => {
                  const isLast = index === allProducts.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id} className='group relative'>
                      <td className={classes}>
                        <Avatar
                          src={images.length > 0 ? images[0].url : ""}
                          alt={name}
                          size='md'
                          className='border border-blue-gray-50 bg-blue-gray-50/50 object-fill p-0'
                        />
                      </td>
                      <td className={classes}>
                        <Typography variant='small' color='blue-gray' className='font-bold'>
                          {name}
                        </Typography>
                        <div className='absolute hidden group-hover:flex py-1'>
                          <button
                            className='text-red-700 text-[13px] font-normal cursor-pointer'
                            onClick={() => removeProducts(_id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                          {sku}
                        </Typography>
                      </td>
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
                        {salePrice && saleStart && new Date(saleStart) <= new Date() ? (
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
                          <Typography variant='small' color='blue-gray' className='font-normal'>
                            ₹{price}.00
                          </Typography>
                        )}
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal truncate max-w-40'
                        >
                          {selectedCategories}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                          {tags}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal max-w-[5rem]'
                        >
                          Published <br />
                          {formatTimestamp(createdAt)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content='Edit User'>
                          <IconButton
                            variant='text'
                            onClick={() => navigate(`/edit_product/${_id}`)}
                          >
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
      <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <Button
          variant='outlined'
          size='sm'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className='flex items-center gap-2'>
          {pageNumbers.map((pageNumber) => (
            <IconButton
              key={pageNumber}
              variant={pageNumber === currentPage ? "outlined" : "text"}
              size='sm'
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </IconButton>
          ))}
        </div>
        <Button
          variant='outlined'
          size='sm'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AllProducts;
