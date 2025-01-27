import express from "express";
import upload from "../middleware/multer.js";
import {
  addProduct,
  listProducts,
  removeProducts,
  updateProduct,
  singleProduct,
} from "../controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js";
import checkExpiredSales from "../middleware/checkExpiredSales.js";

const productRouter = express.Router();

// productRouter.post("/products", upload.array("images", 5), addProducts);
// productRouter.post("/add-product", upload.array("images", 4), addProduct);
productRouter.post(
  "/add-product",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove", upload.none(), removeProducts);
productRouter.get("/list-products", listProducts);
productRouter.post("/single-product",upload.none(), singleProduct);
productRouter.post(
  "/update",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProduct
);

export default productRouter;
