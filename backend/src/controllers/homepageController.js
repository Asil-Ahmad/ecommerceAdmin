import { v2 as cloudinary } from "cloudinary";
import homepageModel from "../models/homepageModel.js";

export const addHomepage = async (req, res) => {
  try {
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item, index) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        const altTextKey = `altText${index + 1}`; // Expect keys like altText1, altText2, etc.
        const text1Key = `text1${index + 1}`;
        const text2Key = `text2${index + 1}`;
        return {
          url: result.secure_url,
          altText: req.body[altTextKey] || item.originalname || "",
          text1: req.body[text1Key] || "",
          text2: req.body[text2Key] || "",
        };
      })
    );
    const homepageData = {
      images: imagesUrl,
      createdAt: Date.now(),
    };
    console.log(homepageData);
    const homepages = new homepageModel(homepageData);
    await homepages.save();

    res.status(200).json({ success: true, message: "Product added successfully", homepages });
  } catch (error) {
    console.log(error);
  }
};
