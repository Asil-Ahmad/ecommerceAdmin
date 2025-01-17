import express from "express";
import upload from "../middleware/multer.js";

import adminAuth from "../middleware/adminAuth.js";
import { addCarousel, getCarousel, updateCarousel } from "../controllers/carouselController.js";

const carouselRouter = express.Router();

carouselRouter.post("/add-carousel", upload.single("image"), addCarousel);
carouselRouter.get("/get-carousel", getCarousel);
carouselRouter.post("/update-carousel", upload.array("images"), updateCarousel);

export default carouselRouter;
