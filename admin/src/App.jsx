import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
//Products
import AllProducts from "./Pages/Products/AllProducts";
import AddProduct from "./Pages/Products/AddProduct";
//Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className='flex'>
      <ToastContainer />
      <Sidebar />

      <Routes>
        <Route path='/' element={<Home />} />

        {/* Products Routes */}
        <Route path='/all_products' element={<AllProducts />} />
        <Route path='/add_new_product' element={<AddProduct />} />
      </Routes>
    </div>
  );
};

export default App;
