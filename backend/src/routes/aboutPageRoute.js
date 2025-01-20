import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import { addAboutPage } from "../controllers/aboutPageController.js";


const aboutPageRouter = express.Router();

aboutPageRouter.post("/add-aboutPage", upload.single("thumbnail"), addAboutPage);

export default aboutPageRouter;
