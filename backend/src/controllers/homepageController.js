import { v2 as cloudinary } from "cloudinary";
import homepageModel from "../models/homepageModel.js";

export const addHomepage = async (req, res) => {
  try {
    // Extract the files
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image1 && req.files.image2[0];
    const image3 = req.files.image1 && req.files.image3[0];
    const image4 = req.files.image1 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    // Handle image upload and text
    let imagesUrl = await Promise.all(
      images.map(async (item, index) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        const altTextKey = `altText${index + 1}`; // Expect keys like altText1, altText2, etc.
        return {
          url: result.secure_url,
          altText: req.body[altTextKey] || item.originalname || "", // Use custom altText or fallback to filename
        };
      })
    );

    // Prepare the data to save to the database
    const homepageData = { images: imagesUrl, createdAt: Date.now() };

    const homepage = new homepageModel(homepageData);
    await homepage.save();

    res.status(200).json({ success: true, message: "Homepage added successfully", homepage });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Failed to add homepage!" });
  }
};
