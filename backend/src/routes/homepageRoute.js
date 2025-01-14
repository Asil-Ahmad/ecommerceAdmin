import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import { addHomepage, getHomepage, updateHomepage } from "../controllers/homepageController.js";

const homepageRouter = express.Router();

homepageRouter.post(
  "/add-homepage",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addHomepage
);
homepageRouter.get("/get-homepage", getHomepage);
homepageRouter.post(
  "/update-homepage",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateHomepage
);

export default homepageRouter;
