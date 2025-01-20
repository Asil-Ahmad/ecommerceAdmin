import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { LoaderSmall } from "../../constant/LoaderSmall";
import BrandData from "./Sidebar/BrandData";

const TABLE_HEAD = [
  "Thumbnail",
  "Name",
  "Slug",
  "Description",
  "Created At",
  "Updated At",
  "Actions",
];

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const { backendURL, navigate } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    thumbnail: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const brandsPerPage = 6;

  // Helper to format timestamps
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${year}/${month}/${day} at ${hours}:${minutes} ${ampm}`;
  };

  // Fetch brands from the backend
  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/brand/list-brands`);
      const { Brands } = response.data;
      setBrands(Brands);
      setFilteredBrands(Brands); // Ensure filteredBrands is updated
    } catch (error) {
      console.error("Failed to fetch brands", error);
    }
  };

  // Remove a brand
  const removeBrand = async (id) => {
    try {
      const response = await axios.post(`${backendURL}/api/brand/remove-brand`, { id });
      if (response.data) {
        toast.success(response.data.message);
        await fetchBrands();
      }
    } catch (error) {
      console.error("Error removing brand", error);
    }
  };

  // Add a new brand
  const handleAddBrand = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("slug", formData.slug);
      data.append(
        "description",
        formData.description === "" ? "No description provided" : formData.description
      );
      data.append("thumbnail", formData.thumbnail);

      const response = await axios.post(`${backendURL}/api/brand/add-brand`, data);
      if (response.data) {
        toast.success(response.data.message);
        await fetchBrands();
      }
    } catch (error) {
      console.error("Error adding brand", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [backendURL]);

  // Search brands
  const handleSearch = () => {
    const filtered = brands.filter((brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBrands(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = filteredBrands?.slice(indexOfFirstBrand, indexOfLastBrand);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredBrands.length / brandsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card className='h-screen w-full'>
      <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center mt-2'>
          <div>
            <Typography variant='h5' color='blue-gray'>
              Brands
            </Typography>
          </div>
          <div className='flex items-center justify-between w-full shrink-0 gap-2 md:w-max'>
            <div className='w-full md:w-72'>
              <Input
                label='Search'
                icon={<MagnifyingGlassIcon className='h-5 w-5' />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className='py-[8px] px-3 rounded-md border border-gray-400'
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </CardHeader>
      <div className='flex'>
        <BrandData
          formData={formData}
          setFormData={setFormData}
          handleAddCategory={handleAddBrand}
        />
        <div className='w-[75%]'>
          {loading ? (
            <LoaderSmall />
          ) : (
            <CardBody className='h-[75vh] overflow-scroll px-0 p-0 rounded-r-lg'>
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
                  {currentBrands.length === 0 ? (
                    <tr>
                      <td colSpan={7} className='text-center py-4'>
                        No brands found
                      </td>
                    </tr>
                  ) : (
                    currentBrands.map(
                      ({ _id, thumbnail, slug, name, description, createdAt, updatedAt }) => (
                        <tr key={_id} className='even:bg-blue-gray-50/50'>
                          <td className='p-4'>
                            <img src={thumbnail} alt='' width={50} />
                          </td>
                          <td className='p-4'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal max-w-20 truncate'
                            >
                              {name}
                            </Typography>
                          </td>
                          <td className='p-4'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal max-w-20 truncate'
                            >
                              {slug}
                            </Typography>
                          </td>
                          <td className='p-4'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal max-w-40 truncate'
                            >
                              {description}
                            </Typography>
                          </td>
                          <td className='p-4'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal max-w-[5rem]'
                            >
                              {formatTimestamp(createdAt)}
                            </Typography>
                          </td>
                          <td className='p-4'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal max-w-[5rem]'
                            >
                              {createdAt === updatedAt ? "Not updated" : formatTimestamp(updatedAt)}
                            </Typography>
                          </td>
                          <td className='p-4'>
                            <div className='flex gap-2'>
                              <Tooltip content='Edit Brand'>
                                <IconButton
                                  variant='text'
                                  color='blue-gray'
                                  onClick={() => navigate(`/edit_brand/${_id}`)}
                                >
                                  <PencilIcon className='h-4 w-4' />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content='Delete Brand'>
                                <IconButton
                                  variant='text'
                                  color='red'
                                  onClick={() => removeBrand(_id)}
                                >
                                  <TrashIcon className='h-4 w-4' />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </CardBody>
          )}
          <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
            <Typography variant='small' color='blue-gray' className='font-normal'>
              Page {currentPage} of {Math.ceil(filteredBrands.length / brandsPerPage)}
            </Typography>
            <div className='flex gap-2'>
              <Button
                variant='outlined'
                color='blue-gray'
                size='sm'
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant='outlined'
                color='blue-gray'
                size='sm'
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(filteredBrands.length / brandsPerPage)}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default Brands;
