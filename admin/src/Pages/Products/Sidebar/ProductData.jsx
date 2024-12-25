import React, { useState } from "react";
import { simpleProduct } from "../../../constant";
import { ClipboardIcon, TruckIcon, WindowIcon, WrenchIcon } from "@heroicons/react/24/solid";

const ProductData = ({ productData }) => {
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
  } = productData;
  const [activeTab, setActiveTab] = useState("General");
  const [productDetails, setProductDetails] = useState({
    regularPrice: "",
    salePrice: "",
    sku: "",
    stock: "",
    quantity: "",
    stockStatus: "inStock",
    shippingAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

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
                className=' border w-1/2  border-black rounded p-1'
              />
            </div>

            <div className='flex items-center  '>
              <label className=' w-full max-w-[7.5rem]'>Sale Price (₹)</label>
              <input
                type='number'
                name='salePrice'
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value === "" ? 0 : Number(e.target.value))}
                className='border w-1/2 border-black rounded p-1'
              />
            </div>
            <div className='sale-period-form'>
              <label>
                Sale Start:
                <input
                  type='datetime-local'
                  value={saleStart ? new Date(saleStart).toISOString().slice(0, -1) : ""}
                  onChange={(e) => setSaleStart(new Date(e.target.value).getTime())}
                />
              </label>

              <label>
                Sale End:
                <input
                  type='datetime-local'
                  value={saleEnd ? new Date(saleEnd).toISOString().slice(0, -1) : ""}
                  onChange={(e) => setSaleEnd(new Date(e.target.value).getTime())}
                />
              </label>
            </div>
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
          <div>
            <div className='mt-4'>
              <label className='block mb-2'>Shipping Address</label>
              <input
                type='text'
                name='shippingAddress'
                value={productDetails.shippingAddress}
                onChange={handleInputChange}
                className='w-full border rounded p-2'
              />
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
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
