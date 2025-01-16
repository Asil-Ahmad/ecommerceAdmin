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
import { PencilIcon, TrashIcon, PlusIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryData from "./Sidebar/CategoryData";
import { LoaderSmall } from "../../constant/LoaderSmall";

const TABLE_HEAD = [
  "Thumbnail",
  "Name",
  "Slug",
  "Description",
  "Created At",
  "Updated At",
  "Actions",
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { backendURL } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    thumbnail: false,
  });
  const { navigate } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 6;

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

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/category/list-categories`);
      const { categories } = response.data;
      setCategories(categories);
      setFilteredCategories(categories);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const removeCategory = async (id) => {
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

  const handleAddCategory = async () => {
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
      const response = await axios.post(`${backendURL}/api/category/add-category`, data);
      if (response.data) {
        toast.success(response.data.message);
        await fetchCategories();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [backendURL]);

  const handleSearch = () => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1);
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredCategories.length / categoriesPerPage)) {
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
              Product Categories
            </Typography>
          </div>
          <div className='flex items-center justify-between w-full shrink-0 gap-2 md:w-max '>
            <div className='w-full md:w-72 '>
              <Input
                label='Search'
                icon={<MagnifyingGlassIcon className='h-5 w-5' />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className='py-[8px] px-3 rounded-md border border-gray-400' onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </CardHeader>
      <div className='flex'>
        <CategoryData
          formData={formData}
          setFormData={setFormData}
          handleAddCategory={handleAddCategory}
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
                  {filteredCategories.length === 0 ? (
                    <h1 className='text-center w-full'>No category found</h1>
                  ) : (
                    currentCategories.map(
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
                              <Tooltip content='Edit Category'>
                                <IconButton
                                  variant='text'
                                  color='blue-gray'
                                  onClick={() => navigate(`/edit_category/${_id}`)}
                                >
                                  <PencilIcon className='h-4 w-4' />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content='Delete Category'>
                                <IconButton
                                  variant='text'
                                  color='red'
                                  onClick={() => removeCategory(_id)}
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
          <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4 '>
            <Typography variant='small' color='blue-gray' className='font-normal'>
              Page {currentPage} of {Math.ceil(filteredCategories.length / categoriesPerPage)}
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
                disabled={currentPage === Math.ceil(filteredCategories.length / categoriesPerPage)}
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

export default Categories;
