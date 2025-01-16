import React from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  console.log(id);

  const fetchProducts = async () => {
    const response = await axios.get(`http://localhost:4000/api/product/${id}`);
    const { product } = response.data;
    console.log(product);
  };

  return <div className='container'>ProductPage</div>;
};

export default ProductPage;
