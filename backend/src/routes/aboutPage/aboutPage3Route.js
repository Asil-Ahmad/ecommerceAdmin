import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import upload from "../../middleware/multer.js";
import { addAboutPage3, getAboutPage3, updateAboutPage3 } from "../../controllers/aboutPageContollers/aboutPage3Controller.js";


const aboutPage3Router = Router();

aboutPage3Router.post("/add-aboutPage3", upload.single("image"), addAboutPage3);
aboutPage3Router.get("/get-aboutPage3", getAboutPage3);
aboutPage3Router.post("/update", upload.single("image"), updateAboutPage3);

export default aboutPage3Router;