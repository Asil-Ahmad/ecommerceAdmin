import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "../../constant/Slider";
import { Typography, Input, Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import { PlusIcon, XMarkIcon, PencilIcon } from "@heroicons/react/24/solid";
import Loader from "../../constant/Loader";
import { toast } from "react-toastify";

const Carousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    link: "",
    image: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    image: "",
  });

  //todo Get carousel images
  const fetchCarousel = async () => {
    try {
      const response = await axios("http://localhost:4000/api/layout/get-carousel");
      const { carousel } = response.data;
      // console.log(carousel);
      setCarouselImages(carousel);
    } catch (error) {
      console.log(error);
    }
  };

  //todo Add carousel slide
  const addSlide = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("link", formData.link);
      data.append("image", formData.image);
      const response = await axios.post("http://localhost:4000/api/layout/add-carousel", data);
      if (response.data) {
        toast.success(response.data.message);
        setFormData({ name: "", link: "", image: "" });
        setOpenModal(false);
        fetchCarousel();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //todo Update carousel slide
  const updateSlide = async (id) => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("id", id);
      data.append("name", editFormData.name);
      data.append("link", editFormData.link);
      data.append("image", editFormData.image);
      const response = await axios.post("http://localhost:4000/api/layout/update-carousel", data);
      toast.success(response.data.message);
      fetchCarousel();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setEditModal(false);
    }
  };

  const getSlide = async (id) => {
    try {
      const response = await axios.post("http://localhost:4000/api/layout/single-carousel", { id });
      const { carousel } = response.data;
      console.log(carousel);
      setEditFormData(carousel);
    } catch (error) {
      console.log(error);
    }
  };

  //todo Remove carousel slide
  const removeSlide = async (id) => {
    try {
      const response = await axios.post("http://localhost:4000/api/layout/delete-carousel", { id });
      console.log(response.data);
      fetchCarousel();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarousel();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className='container mx-auto'>
      <div className='p-4 m-2 border-dashed hover:border-gray-400 transition-all duration-300 border-2 sticky top-0 z-50 bg-white'>
        <Slider carouselImages={carouselImages} />
      </div>

      <div className='px-4 py-6'>
        <Typography variant='h6' color='blue-gray' className='mb-4'>
          Carousel Slides Preview ({carouselImages.length})
        </Typography>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-6 items-center '>
          {carouselImages.map((img) => (
            <Card key={img._id} className='overflow-hidden relative group bg-gray-50'>
              <CardHeader
                floated={false}
                shadow={false}
                color='transparent'
                className='m-0 rounded-none '
              >
                <img
                  src={img.image}
                  alt='Carousel Image'
                  className='w-full h-24 object-cover object-top pt-8 '
                />
                {/* todo Edit Icons */}
                <XMarkIcon
                  className='opacity-0 cursor-pointer group-hover:opacity-100 w-5 h-5 absolute top-1 right-1 bg-red-500 text-white rounded-full'
                  onClick={() => removeSlide(img._id)}
                />
                <PencilIcon
                  className='opacity-0 cursor-pointer group-hover:opacity-100 w-5 h-5 p-1 absolute top-1 left-1 bg-green-500 text-white rounded-full'
                  onClick={() => {
                    setEditModal(true), getSlide(img._id);
                  }}
                />
              </CardHeader>
              <CardBody className=''>
                <Input label='Product Link' value={img.link} readOnly />
              </CardBody>
            </Card>
          ))}
          <div className='flex row-end-1 justify-center items-center border-dashed border-2 hover:bg-gray-50 border-gray-400 rounded-lg h-full'>
            <PlusIcon
              onClick={() => setOpenModal(!openModal)}
              className='w-10 h-10 bg-gray-200 hover:bg-gray-500 transition-all duration-200 hover:text-white rounded-lg p-2 cursor-pointer'
            />
            {/* todo Add Modal */}
            {openModal && (
              <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                <div className='bg-white p-6 rounded-lg w-96'>
                  <Typography variant='h6' color='blue-gray' className='mb-4'>
                    Add New Carousel Slide
                  </Typography>
                  <div className='space-y-4'>
                    <div className='relative border-2 border-dashed rounded-lg p-4 hover:border-gray-400 transition-all duration-300'>
                      <label htmlFor='image' className='block cursor-pointer'>
                        {formData.image ? (
                          <img
                            src={URL.createObjectURL(formData.image)}
                            alt='Product Image'
                            className='w-full h-24 object-cover object-top'
                          />
                        ) : (
                          <div className='text-center w-full h-24 content-center'>
                            <p className='text-sm text-gray-500'>Click or drag image to upload</p>
                          </div>
                        )}
                        <input
                          type='file'
                          accept='image/*'
                          id='image'
                          hidden
                          required
                          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setFormData({ ...formData, image: file });
                          }}
                        />
                      </label>
                    </div>
                    <Input
                      type='text'
                      label='Product Link'
                      required
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    />
                    <Input
                      type='text'
                      label='Product Name'
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <div className='flex justify-end gap-2'>
                      <Button variant='outlined' onClick={() => setOpenModal(false)}>
                        Cancel
                      </Button>
                      <Button onClick={addSlide}>Add Slide</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* todo Update Modal */}

            {editModal && (
              <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                <div className='bg-white p-6 rounded-lg w-96'>
                  <Typography variant='h6' color='blue-gray' className='mb-4'>
                    Update Carousel Slide
                  </Typography>
                  <div className='space-y-4'>
                    <div className='relative border-2 border-dashed rounded-lg p-4 hover:border-gray-400 transition-all duration-300'>
                      <label htmlFor='image' className='block cursor-pointer'>
                        {editFormData.image ? (
                          <img
                            src={
                              typeof editFormData.image === "string"
                                ? editFormData.image
                                : URL.createObjectURL(editFormData.image)
                            }
                            alt='Product Image'
                            className='w-full h-24 object-cover object-top'
                          />
                        ) : (
                          <div className='text-center w-full h-24 content-center'>
                            <p className='text-sm text-gray-500'>Click or drag image to upload</p>
                          </div>
                        )}
                        <input
                          type='file'
                          accept='image/*'
                          id='image'
                          hidden
                          required
                          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setEditFormData({ ...editFormData, image: file });
                          }}
                        />
                      </label>
                    </div>
                    <Input
                      type='text'
                      label='Product Link'
                      required
                      value={editFormData.link}
                      onChange={(e) => setEditFormData({ ...editFormData, link: e.target.value })}
                    />
                    <Input
                      type='text'
                      label='Product Name'
                      required
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    />
                    <div className='flex justify-end gap-2'>
                      <Button variant='outlined' onClick={() => setEditModal(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => updateSlide(editFormData._id)}>Update Slide</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
