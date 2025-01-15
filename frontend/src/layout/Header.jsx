import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Header = () => {
  const [headerData, setHeaderData] = useState("");

  const getHeaders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/layout/get-header");
      const { header } = response.data;
      setHeaderData(header);
      // console.log(response.data.header);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getHeaders();
  }, []);
  return (
    <header className='pb-5 '>
      {headerData && (
        <nav className='container  flex justify-between items-center '>
          <img src={headerData.logo} alt='' className='w-[150px] h-[70px] object-contain my-5' />

          <div className='flex gap-10'>
            {headerData?.links?.map(({ text, url }, index) => (
              <Link to={url} key={index}>
                {text}
              </Link>
            ))}
          </div>
        </nav>
      )}
      <hr />
    </header>
  );
};

export default Header;
