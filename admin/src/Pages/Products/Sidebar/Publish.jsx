import React, { useContext, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { ChevronDownIcon, CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ShopContext } from "../../../context/ShopContext";
import { uploadImageIcon } from "../../../assets/icons";

const MiniSidebar = ({
  handleAddProduct,
  handleAddCategory,
  handleCheckboxChange,
  productData,
}) => {
  const {
    image1,
    setImage1,
    image2,
    setImage2,
    image3,
    setImage3,
    image4,
    setImage4,
    categories,
    setCategories,
    newCategory,
    setNewCategory,
    selectedCategories,
    setSelectedCategories,
  } = productData;

  const { navigate, test } = useContext(ShopContext);

  const [open, setOpen] = useState([1, 2, 3, 4]); //! Default: all accordions open
  const [openImageModal1, setOpenImageModal1] = useState(false);
  const [openImageModal2, setOpenImageModal2] = useState(false);

  const handleOpen = (value) => {
    setOpen(
      (prevOpen) =>
        prevOpen.includes(value)
          ? prevOpen.filter((item) => item !== value) // Close the accordion
          : [...prevOpen, value] // Open the accordion
    );
  };

  return (
    <Card className='h-screen overflow-y-auto w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5'>
      <div className='flex flex-col h-full items-center justify-start gap-5'>
        {/* Publish */}
        <List className='border border-black rounded-lg '>
          <Accordion
            open={open.includes(1)}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open.includes(1) ? "rotate-180" : ""
                }`}
              />
            }
          >
            {/* todo Publish Product */}
            <ListItem className='p-0' selected={open.includes(1)}>
              <AccordionHeader onClick={() => handleOpen(1)} className='border-b-0 p-3'>
                <Typography color='black' className='mr-auto font-bold'>
                  Publish
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className='py-1'>
              <List className='p-0'>
                <ListItem>Draft</ListItem>
                <ListItem>Public</ListItem>
                <input
                  type='button'
                  popovertarget='box'
                  value='Publish'
                  className='bg-blue-500 py-1 text-white font-bold text-center hover:bg-blue-700 cursor-pointer'
                />
              </List>
            </AccordionBody>
          </Accordion>
        </List>

        <div
          id='box'
          popover='auto'
          className='bg-white border shadow-2xl border-gray-300 z-10 sm:w-[25%] sm:h-[25%] w-full h-full p-2 text-center  content-center '
        >
          <div className='flex flex-col  gap-5 items-center justify-center '>
            <div className='flex items-center justify-center h-10 w-10 bg-green-500 rounded-full'>
              <CheckIcon className='h-6 w-6 text-white' />
            </div>
            <p className='text-black text-xl'>Product Added Successfully!</p>
          </div>
        </div>

        {/* todo Add Product Image Main */}
        <List className='border border-black rounded-lg'>
          <Accordion
            open={open.includes(2)}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open.includes(2) ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className='p-0' selected={open.includes(2)}>
              <AccordionHeader onClick={() => handleOpen(2)} className='border-b-0 p-3'>
                <Typography color='black' className='mr-auto font-bold'>
                  Product Image
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className='py-1'>
              <List className='p-0 '>
                {image1 ? (
                  <div className='w-full flex justify-center border rounded-lg'>
                    <img
                      src={URL.createObjectURL(image1)}
                      alt='Preview'
                      className='w-52 h-52 object-contain'
                    />
                  </div>
                ) : (
                  ""
                )}
                {!image1 ? (
                  <p
                    onClick={() => setOpenImageModal1(!openImageModal1)}
                    className='text-blue-500 text-left underline px-2 cursor-pointer'
                  >
                    Set product image
                  </p>
                ) : (
                  <p
                    onClick={() => setImage1("")}
                    className='text-red-600  text-center border border-red-600 py-1 rounded-lg px-2 cursor-pointer'
                  >
                    Remove product image
                  </p>
                )}
              </List>
            </AccordionBody>
          </Accordion>
        </List>

        {openImageModal1 ? (
          <div className='fixed top-1/2 left-1/2 bg-white border shadow-2xl border-gray-300 z-10 w-[600px] p-4 transform -translate-x-1/2 -translate-y-1/2'>
            <Typography variant='h5' color='blue-gray'>
              Product Image
            </Typography>

            <hr />

            <label htmlFor='image1'>
              <div className='flex gap-2 sm:justify-center border mt-5 justify-start rounded-md  bg-white w-full py-20 px-4'>
                {image1 ? (
                  <>
                    <img
                      src={URL.createObjectURL(image1)}
                      alt='Preview'
                      className='w-52 h-52 object-contain'
                    />
                    <input
                      onChange={(e) => setImage1(e.target.files[0])}
                      type='file'
                      id='image1'
                      accept='image/*' // Optional: Restrict file types to images
                      hidden
                    />
                  </>
                ) : (
                  <Button
                    variant='outlined'
                    onClick={() => document.getElementById("image1").click()}
                  >
                    Select File
                    <input
                      onChange={(e) => setImage1(e.target.files[0])}
                      type='file'
                      id='image1'
                      accept='image/*' // Optional: Restrict file types to images
                      hidden
                    />
                  </Button>
                )}
              </div>
            </label>
            <Button className='mt-5' onClick={() => setOpenImageModal1(false)}>
              Set product image
            </Button>
          </div>
        ) : (
          ""
        )}

        {/* todo Add Product Image Gallery */}
        <List className='border border-black rounded-lg'>
          <Accordion
            open={open.includes(3)}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open.includes(3) ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className='p-0' selected={open.includes(3)}>
              <AccordionHeader onClick={() => handleOpen(3)} className='border-b-0 p-3'>
                <Typography color='black' className='mr-auto font-bold'>
                  Product Gallery
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className='py-1'>
              <List className='p-0 '>
                {image2 || image3 || image4 ? (
                  <div className='w-full flex gap-1 justify-center py-1 border rounded-lg'>
                    {image2 && (
                      <img
                        src={URL.createObjectURL(image2)}
                        alt='Preview'
                        className='w-12 h-12 object-contain border border-gray-500 bg-gray-200'
                      />
                    )}
                    {image3 && (
                      <img
                        src={URL.createObjectURL(image3)}
                        alt='Preview'
                        className='w-12 h-12 object-contain border border-gray-500 bg-gray-200'
                      />
                    )}
                    {image4 && (
                      <img
                        src={URL.createObjectURL(image4)}
                        alt='Preview'
                        className='w-12 h-12 object-contain border border-gray-500 bg-gray-300'
                      />
                    )}
                  </div>
                ) : null}

                <p
                  onClick={() => setOpenImageModal2(!openImageModal2)}
                  className='text-blue-500 text-left underline px-2 cursor-pointer'
                >
                  Add product gallery images
                </p>
              </List>
            </AccordionBody>
          </Accordion>
        </List>

        {openImageModal2 ? (
          <div className='fixed top-1/2 left-1/2 bg-white border shadow-2xl border-gray-300 z-10 w-[800px] p-4 transform -translate-x-1/2 -translate-y-1/2'>
            <Typography variant='h5' color='blue-gray'>
              Product Image
            </Typography>

            <hr />

            <div className='w-full flex justify-center items-center gap-5'>
              <label htmlFor='image2'>
                <div className='flex gap-2 sm:justify-center border mt-5 justify-start rounded-md  bg-white w-full py-20 px-4'>
                  {image2 ? (
                    <>
                      <img
                        src={URL.createObjectURL(image2)}
                        alt='Preview'
                        className='w-52 h-52 object-contain'
                      />
                      <input
                        onChange={(e) => setImage2(e.target.files[0])}
                        type='file'
                        id='image2'
                        accept='image/*' // Optional: Restrict file types to images
                        hidden
                      />
                    </>
                  ) : (
                    <Button
                      variant='outlined'
                      onClick={() => document.getElementById("image2").click()}
                    >
                      Select Files
                      <input
                        onChange={(e) => setImage2(e.target.files[0])}
                        type='file'
                        id='image2'
                        accept='image/*' // Optional: Restrict file types to images
                        hidden
                      />
                    </Button>
                  )}
                </div>
              </label>

              <label htmlFor='image3'>
                <div className='flex gap-2 sm:justify-center border mt-5 justify-start rounded-md  bg-white w-full py-20 px-4'>
                  {image3 ? (
                    <>
                      <img
                        src={URL.createObjectURL(image3)}
                        alt='Preview'
                        className='w-52 h-52 object-contain'
                      />
                      <input
                        onChange={(e) => setImage3(e.target.files[0])}
                        type='file'
                        id='image3'
                        accept='image/*' // Optional: Restrict file types to images
                        hidden
                      />
                    </>
                  ) : (
                    <Button
                      variant='outlined'
                      onClick={() => document.getElementById("image3").click()}
                    >
                      Select Files
                      <input
                        onChange={(e) => setImage3(e.target.files[0])}
                        type='file'
                        id='image3'
                        accept='image/*' // Optional: Restrict file types to images
                        hidden
                      />
                    </Button>
                  )}
                </div>
              </label>

              <label htmlFor='image4'>
                <div className='flex gap-2 sm:justify-center border mt-5 justify-start rounded-md  bg-white w-full py-20 px-4'>
                  {image4 ? (
                    <>
                      <img
                        src={URL.createObjectURL(image4)}
                        alt='Preview'
                        className='w-52 h-52 object-contain'
                      />
                      <input
                        onChange={(e) => setImage4(e.target.files[0])}
                        type='file'
                        id='image4'
                        accept='image/*' // Optional: Restrict file types to images
                        hidden
                      />
                    </>
                  ) : (
                    <Button
                      variant='outlined'
                      onClick={() => document.getElementById("image4").click()}
                    >
                      Select Files
                      <input
                        onChange={(e) => setImage4(e.target.files[0])}
                        type='file'
                        id='image4'
                        accept='image/*' // Optional: Restrict file types to images
                        hidden
                      />
                    </Button>
                  )}
                </div>
              </label>
            </div>
            <Button className='mt-5' onClick={() => setOpenImageModal2(false)}>
              Set product image
            </Button>
          </div>
        ) : (
          ""
        )}

        {/* todo Add Product Category */}
        <List className='border border-black rounded-lg'>
          <Accordion
            open={open.includes(4)}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open.includes(4) ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className='p-0' selected={open.includes(4)}>
              <AccordionHeader onClick={() => handleOpen(4)} className='border-b-0 p-3'>
                <Typography color='black' className='mr-auto font-bold'>
                  Product Categories
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className='py-1'>
              <List>
                <div className='p-0'>
                  {categories.length > 0 ? (
                    <div className='flex flex-col gap-2 border p-1 rounded-lg'>
                      {categories.map((category) => (
                        <div key={category} className='flex items-center gap-2'>
                          <input
                            type='checkbox'
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCheckboxChange(category)}
                            className='cursor-pointer'
                          />
                          <p className='text-black'>{category}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}

                  <div className='mt-4 w-full flex flex-col gap-2 '>
                    <input
                      type='text'
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // Prevent default Enter key behavior (like form submission)
                          handleAddCategory();
                        }
                      }}
                      placeholder='Add new category'
                      className='border border-gray-300 rounded-md px-2 py-1'
                    />
                    <button
                      onClick={handleAddCategory}
                      className=' py-1 text-blue-500 font-semibold gap-2 underline text-sm flex items-center  cursor-pointer'
                    >
                      <PlusIcon strokeWidth={2.5} className='w-4' /> Add Category
                    </button>
                  </div>
                </div>
              </List>
            </AccordionBody>
          </Accordion>
        </List>
      </div>
    </Card>
  );
};

export default MiniSidebar;
