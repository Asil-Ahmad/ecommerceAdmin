import upload from "../middleware/multer.js";
import { v2 as cloudinary } from "cloudinary";
import brandModel from "../models/UI/brandModel.js";

export const addBrand = async (req, res) => {
  const { name, link } = req.body;
  if (!name || !link)
    return res.status(400).json({ success: false, message: "Name and link are required" });
  try {
    const brandData = {
      name,
      link,
    };
    const brand = new brandModel(brandData);
    await brand.save();
    res.status(200).json({ success: true, message: "Brand added successfully", brand });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to add brand!", error: error });
    console.log(error);
  }
};
