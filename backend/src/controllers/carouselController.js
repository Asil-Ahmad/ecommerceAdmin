import upload from "../middleware/multer.js";
import { v2 as cloudinary } from "cloudinary";
import carouselModel from "../models/carouselModel.js";

export const addCarousel = async (req, res) => {
  try {
    const { links } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    if (!links || links.length !== files.length) {
      return res.status(400).json({ message: "Links and files count mismatch" });
    }

    const images = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const link = links[i];

      const result = await cloudinary.uploader.upload(file.path, {
        folder: "carousel",
      });

      images.push({
        url: result.secure_url,
        link: link,
      });
    }
    const carousel = new carouselModel({ images });
    await carousel.save();

    res.status(201).json({ message: "Carousel added successfully", carousel });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
