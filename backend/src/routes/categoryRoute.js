import express from "express";
import upload from "../middleware/multer.js";

import adminAuth from "../middleware/adminAuth.js";
import { addCategory, getCategories } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/add-category", upload.none(), addCategory);
categoryRouter.get("/list-categories", getCategories);

export default categoryRouter;
