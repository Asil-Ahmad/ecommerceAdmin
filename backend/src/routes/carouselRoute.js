import express from "express";
import upload from "../middleware/multer.js";

import adminAuth from "../middleware/adminAuth.js";
import { addCarousel } from "../controllers/carouselController.js";

const carouselRouter = express.Router();

carouselRouter.post("/add-carousel", upload.array("images"), addCarousel);

export default carouselRouter;
