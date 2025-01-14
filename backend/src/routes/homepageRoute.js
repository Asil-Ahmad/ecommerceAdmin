import express from "express";
import upload from "../middleware/multer.js";

import adminAuth from "../middleware/adminAuth.js";
import { addHomepage } from "../controllers/homepageController.js";

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
// homepageRouter.post("/update-homepage", upload.single("logo"), updatehomepage);
// homepageRouter.get("/get-homepage", gethomepage);

export default homepageRouter;
