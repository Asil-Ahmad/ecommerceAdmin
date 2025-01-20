import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import { addAboutPage, getAboutPage } from "../controllers/aboutPageContollers/aboutPageController.js";


const aboutPageRouter = express.Router();

aboutPageRouter.post("/add-aboutPage", upload.single("image"), addAboutPage);
aboutPageRouter.get("/get-aboutPage", getAboutPage);

export default aboutPageRouter;
