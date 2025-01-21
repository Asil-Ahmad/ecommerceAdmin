import express from "express";
import upload from "../../middleware/multer.js";
import { v2 as cloudinary } from "cloudinary";
import {
  createAboutPageFeature,
  getAboutPageFeature,
  updateAboutPageFeature,
} from "../../controllers/aboutPageContollers/aboutPageFeatureController.js";

const aboutPageFeatureRouter = express.Router();

aboutPageFeatureRouter.post(
  "/add-aboutFeatured",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  createAboutPageFeature
);
aboutPageFeatureRouter.put(
  "/update-aboutFeatured",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  updateAboutPageFeature
);
aboutPageFeatureRouter.get("/get-aboutFeature", getAboutPageFeature);

export default aboutPageFeatureRouter;
