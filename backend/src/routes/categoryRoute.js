import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  addCategory,
  getCategories,
  removeCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/add-category", upload.single("thumbnail"), addCategory);
categoryRouter.post("/update-category", upload.single("thumbnail"), updateCategory);
categoryRouter.get("/list-categories", getCategories);
categoryRouter.post("/remove-category", upload.none(), removeCategory);

export default categoryRouter;
