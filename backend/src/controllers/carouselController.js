import upload from "../middleware/multer.js";
import { v2 as cloudinary } from "cloudinary";
import carouselModel from "../models/carouselModel.js";

export const addCarousel = async (req, res) => {
  try {
    const { link, name } = req.body;

    const imageFile = req.file ? req.file : null; // Uploaded file for the logo

    // Default logo URL
    let imageUrl = "https://ui-avatars.com/api/?name=Default+Image";

    // If a file is uploaded, upload it to Cloudinary
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }

    const carouselData = {
      name,
      link,
      image: imageUrl,
    };
    console.log(carouselData);

    const carousels = new carouselModel(carouselData);
    await carousels.save();

    res.status(200).json({ success: true, message: "Carousel added successfully", carousels });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to add product!", error: error });
    console.log(error);
  }
};

export const updateCarousel = async (req, res) => {
  try {
    const { links } = req.body;
    const files = req.files;

    if (!links || links.length !== files.length) {
      return res.status(400).json({ message: "Links and files count mismatch" });
    }

    const carousel = await carouselModel.findOne();

    if (!carousel) {
      return res.status(404).json({ message: "Carousel not found" });
    }

    const existingImages = carousel.images;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const link = links[i];

      const existingImage = existingImages.find((image) => image.link === link);

      if (existingImage) {
        newImages.push(existingImage);
      } else {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "carousel",
        });

        newImages.push({
          url: result.secure_url,
          link: link,
        });
      }
    }

    carousel.images = newImages;
    await carousel.save();

    res.status(200).json({ message: "Carousel updated successfully", carousel });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getCarousel = async (req, res) => {
  try {
    const carousel = await carouselModel.find();

    res.status(200).json({ carousel });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
