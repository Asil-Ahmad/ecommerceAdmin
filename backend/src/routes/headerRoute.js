import express from "express";
import upload from "../middleware/multer.js";

import adminAuth from "../middleware/adminAuth.js";
import { addHeader, updateHeader } from "../controllers/headerController.js";

const headerRouter = express.Router();

headerRouter.post("/add-header", upload.single("logo"), addHeader);
headerRouter.post("/update-header", upload.single("logo"), updateHeader);

export default headerRouter;
