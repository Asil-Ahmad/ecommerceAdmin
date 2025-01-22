import express from "express";
import upload from "../../middleware/multer.js";
import {
  createAboutPageFeature,
  getAboutPageFeature,
  updateAboutPageFeature,
} from "../../controllers/aboutPageContollers/aboutPageFeatureController.js";

const aboutPageFeatureRouter = express.Router();

aboutPageFeatureRouter.post(
  "/add-aboutFeature",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  createAboutPageFeature
);

aboutPageFeatureRouter.post(
  "/update-aboutFeature",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  updateAboutPageFeature
);

aboutPageFeatureRouter.get("/get-aboutFeature", getAboutPageFeature);

export default aboutPageFeatureRouter;
