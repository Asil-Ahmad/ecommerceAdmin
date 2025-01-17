import express from "express";
import upload from "../middleware/multer.js";

import adminAuth from "../middleware/adminAuth.js";
import { addCarousel, getCarousel } from "../controllers/carouselController.js";

const carouselRouter = express.Router();

carouselRouter.post("/add-carousel", upload.array("images"), addCarousel);
carouselRouter.get("/get-carousel", getCarousel);

export default carouselRouter;
