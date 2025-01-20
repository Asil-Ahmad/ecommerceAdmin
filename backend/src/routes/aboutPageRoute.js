import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  addAboutPage,
  getAboutPage,
  updateAboutPage,
} from "../controllers/aboutPageContollers/aboutPageController.js";

const aboutPageRouter = express.Router();

aboutPageRouter.post("/add-aboutPage", upload.single("image"), addAboutPage);
aboutPageRouter.get("/get-aboutPage", getAboutPage);
aboutPageRouter.post("/update-aboutPage", upload.single("image"), updateAboutPage);

export default aboutPageRouter;
