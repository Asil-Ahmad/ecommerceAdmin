import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Marquee = () => {
  const [brands, setBrands] = useState([]);
  const fetchBrands = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/brand/list-brands`);
      const { Brands } = response.data;
      console.log(Brands);

      setBrands(Brands);
    } catch (error) {
      console.error("Failed to fetch brands", error);
    }
  };
  useEffect(() => {
    fetchBrands();
  }, []);
  return (
    <div className='relative flex overflow-x-hidden border-y-2 border-black'>
      <div className='py-5 animate-marquee whitespace-nowrap flex'>
        {brands.map(({ name, thumbnail, slug }) => (
          <Link to={`/shop/${slug}`} className='mx-10 text-2xl font-light flex '>
            <img src={thumbnail} alt='' className='w-7' />
            {name}
          </Link>
        ))}
      </div>

      <div className='py-5 animate-marquee whitespace-nowrap flex'>
        {brands.map(({ name, thumbnail, slug }) => (
          <Link to={`/shop/${slug}`} className='mx-10 text-2xl font-light flex gap-2 '>
            <img src={thumbnail} alt='' className='w-7' />
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
