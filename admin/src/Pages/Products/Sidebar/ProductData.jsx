import React, { useState, useEffect } from "react";
import { simpleProduct } from "../../../constant";
import { ClipboardIcon, TruckIcon, WindowIcon, WrenchIcon } from "@heroicons/react/24/solid";

const ProductData = ({ productData, handleDimensionChange }) => {
  const {
    price,
    setPrice,
    sku,
    setSku,
    salePrice,
    setSalePrice,
    stock,
    setStock,
    saleStart,
    setSaleStart,
    saleEnd,
    setSaleEnd,
    weight,
    setWeight,
    dimensions,
    isSaleEnabled,
    setIsSaleEnabled,
    setDimensions,
  } = productData;
  const [activeTab, setActiveTab] = useState("General");

  console.log(isSaleEnabled);

  const [productDetails, setProductDetails] = useState({
    regularPrice: "",
    salePrice: "",
    sku: "",
    stock: "",
    quantity: "",
    stockStatus: "inStock",
    shippingAddress: "",
  });

  // useEffect(() => {
  //   const now = new Date().getTime();
  //   if (saleStart && saleEnd && now >= saleStart && now <= saleEnd) {
  //     setIsSaleEnabled(true);
  //   } else {
  //     setIsSaleEnabled(false);
  //   }
  // }, [saleStart, saleEnd]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleOpenSchedule = () => {};

  return (
    <div className='flex p-3 h-full '>
      {/* Tabs */}
      <div className='flex flex-col border w-[20%]'>
        {simpleProduct.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(item.label)}
            className={`py-2 px-4 text-sm border-b flex items-center gap-2 ${
              activeTab === item.label ? " bg-gray-300 " : "text-blue-600"
            }`}
          >
            {item.label === "General" ? <WrenchIcon className='w-4' /> : ""}
            {item.label === "Inventory" ? <ClipboardIcon className='w-4' /> : ""}
            {item.label === "Shipping" ? <TruckIcon className='w-4' /> : ""}
            {item.label === "Attributes" ? <WindowIcon className='w-4' /> : ""}
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='w-full px-5 text-sm relative'>
        {activeTab === "General" && (
          <div className='mt-4 grid grid-cols-1 grid-rows-2 gap-4 text-sm'>
            <div className='flex items-center'>
              <label className=' w-full max-w-[7.5rem]'>Regular Price (₹)</label>
              <input
                type='number'
                name='regularPrice'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='border w-1/2  border-black rounded p-1'
              />
            </div>

            <div className='flex items-center  '>
              <label className=' w-full max-w-[7.5rem]'>Sale Price (₹)</label>
              <input
                type='number'
                name='salePrice'
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value === "" ? "" : Number(e.target.value))}
                className='border w-1/2 border-black rounded p-1'
              />
            </div>
            <div>
              <div className='flex items-center mb-4'>
                <label htmlFor='enableSale' className='w-full max-w-[7.5rem]'>
                  Enable Sale
                </label>
                <input
                  type='checkbox'
                  id='enableSale'
                  checked={isSaleEnabled}
                  onChange={(e) => setIsSaleEnabled(e.target.checked)}
                  className='mr-2'
                />
              </div>
            </div>

            {/* Sale time */}
            {isSaleEnabled && (
              <>
                <div className='flex items-center'>
                  <label className=' w-full max-w-[7.5rem]'>Sale Start:</label>
                  <input
                    type='datetime-local'
                    value={
                      saleStart
                        ? new Date(saleStart).toLocaleString("sv-SE").slice(0, 16)
                        : saleStart
                    }
                    onChange={(e) => setSaleStart(new Date(e.target.value).getTime())}
                    className='border w-1/2 border-black rounded p-1'
                  />
                </div>
                <div className='flex items-center'>
                  <label className=' w-full max-w-[7.5rem]'>Sale End: </label>
                  <input
                    type='datetime-local'
                    value={
                      saleEnd ? new Date(saleEnd).toLocaleString("sv-SE").slice(0, 16) : saleEnd
                    }
                    onChange={(e) => setSaleEnd(new Date(e.target.value).getTime())}
                    className='border w-1/2 border-black rounded p-1'
                  />
                </div>
              </>
            )}

            {/* <label htmlFor='schedule' className='absolute top-40'>
              <input type='date' name='' id='schedule' />
            </label> */}
          </div>
        )}

        {activeTab === "Inventory" && (
          <div className='mt-4 grid grid-cols-1 grid-rows-2 gap-4 text-sm'>
            <div className='flex items-center'>
              <label className=' w-full max-w-[7.5rem]'>SKU</label>
              <input
                type='text'
                name='sku'
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className=' border w-1/2  border-black rounded p-1'
              />
            </div>
            {/* todo Quantity */}
            <div className='flex items-center  '>
              <label className=' w-full max-w-[7.5rem] '>Quantity</label>
              <input
                type='number'
                name='stock'
                min={0}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className='border w-1/2 border-black rounded p-1'
              />
            </div>
            {/* todo Stock Status */}
            <div className='flex items-start'>
              <label className='w-full max-w-[7.5rem]'>Stock Status</label>
              <div className='flex flex-col gap-4'>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='stockStatus'
                    value='inStock'
                    checked={productDetails.stockStatus === "inStock"}
                    onChange={handleInputChange}
                    className='mr-2'
                  />
                  In Stock
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='stockStatus'
                    value='outOfStock'
                    checked={productDetails.stockStatus === "outOfStock"}
                    onChange={handleInputChange}
                    className='mr-2'
                  />
                  Out of Stock
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='stockStatus'
                    value='onBackorder'
                    checked={productDetails.stockStatus === "onBackorder"}
                    onChange={handleInputChange}
                    className='mr-2'
                  />
                  On Backorder
                </label>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Shipping" && (
          <div className='mt-4 grid grid-cols-1 grid-rows-2 gap-4 text-sm'>
            <div className='flex items-center'>
              <label className=' w-full max-w-[7.5rem]'>
                Weight <small>(kg)</small>
              </label>
              <input
                type='number'
                name='weight'
                value={weight}
                placeholder='Weight'
                onChange={(e) => setWeight(e.target.value)}
                className='border w-1/2  border-black rounded p-1 placeholder:text-black'
              />
            </div>

            <div className='flex items-center  '>
              <label className=' w-full max-w-[7.5rem]'>
                Dimensions <small>(cm)</small>
              </label>
              <div className='flex gap-6'>
                <input
                  type='number'
                  name='dlength'
                  value={dimensions.dlength || ""}
                  placeholder='Length'
                  onChange={handleDimensionChange}
                  className='border w-1/2 border-black rounded p-1 placeholder:text-black'
                />
                <input
                  type='number'
                  name='dwidth'
                  value={dimensions.dwidth || ""}
                  placeholder='Width'
                  onChange={handleDimensionChange}
                  className='border w-1/2 border-black rounded p-1 placeholder:text-black'
                />
                <input
                  type='number'
                  name='dheight'
                  value={dimensions.dheight || ""}
                  placeholder='Height'
                  onChange={handleDimensionChange}
                  className='border w-1/2 border-black rounded p-1 placeholder:text-black'
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <button
        onClick={() => console.log(productDetails)}
        className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
      >
        Save Product
      </button> */}
    </div>
  );
};

export default ProductData;
