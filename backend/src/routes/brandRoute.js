import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import { addBrand } from "../controllers/brandController.js";

const brandRouter = express.Router();

brandRouter.post("/add-brand", upload.single("image"), addBrand);

export default brandRouter;
