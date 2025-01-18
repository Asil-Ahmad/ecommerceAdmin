import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import { addBrand, getbrands, removeBrand, updateBrand } from "../controllers/brandController.js";

const brandRouter = express.Router();

brandRouter.post("/add-brand", upload.single("thumbnail"), addBrand);
brandRouter.post("/update-brand", upload.single("thumbnail"), updateBrand);
brandRouter.get("/list-brands", getbrands);
brandRouter.post("/remove-brand", upload.none(), removeBrand);

export default brandRouter;
