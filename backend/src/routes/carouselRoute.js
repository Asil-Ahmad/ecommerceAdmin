import express from "express";
import upload from "../middleware/multer.js";

import adminAuth from "../middleware/adminAuth.js";
import {
  addCarousel,
  deleteCarousel,
  getCarousel,
  singleCarousel,
  updateCarousel,
} from "../controllers/carouselController.js";

const carouselRouter = express.Router();

carouselRouter.post("/add-carousel", upload.single("image"), addCarousel);
carouselRouter.get("/get-carousel", getCarousel);
carouselRouter.post("/update-carousel", upload.single("image"), updateCarousel);
carouselRouter.post("/single-carousel", upload.none(), singleCarousel);
carouselRouter.post("/delete-carousel", upload.none(), deleteCarousel);

export default carouselRouter;
