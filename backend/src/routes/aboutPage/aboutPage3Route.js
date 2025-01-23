import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import upload from "../../middleware/multer.js";

import { addAboutPage3, getAboutPage3, updateAboutPage3 } from "../../controllers/aboutPage3Controller.js";

const aboutPage3router = Router();

aboutPage3router.post("/add", upload.single("image"), addAboutPage3);
aboutPage3router.get("/", getAboutPage3);
aboutPage3router.put("/update", upload.single("image"), updateAboutPage3);

export default aboutPage3router;