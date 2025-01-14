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
        const textKey = `text${index + 1}`; // Expect keys like altText1, altText2, etc.
        const paraKey = `para${index + 1}`; // Expect keys like altText1, altText2, etc.
        return {
          url: result.secure_url,
          altText: req.body[altTextKey] || "", // Use custom altText or fallback to filename
          text: req.body[textKey] || "",
          para: req.body[paraKey] || "",
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

export const getHomepage = async (req, res) => {
  try {
    const homepage = await homepageModel.find().sort({ createdAt: -1 }).limit(1);
    res.status(200).json({ success: true, homepage });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Failed to fetch homepage!" });
  }
};

export const updateHomepage = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);

    // If no ID provided
    if (!_id) {
      return res.status(400).json({ success: false, message: "Homepage ID is required!" });
    }

    // Check if the homepage exists
    const homepageExist = await homepageModel.findById(_id);
    if (!homepageExist) {
      return res.status(404).json({ success: false, message: "Homepage not found!" });
    }

    // Extract the files
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    // Handle image upload and text
    let imagesUrl = await Promise.all(
      images.map(async (item, index) => {
        const altTextKey = `altText${index + 1}`;
        const textKey = `text${index + 1}`;
        const paraKey = `para${index + 1}`;
        if (item) {
          const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
          return {
            url: result.secure_url,
            altText: req.body[altTextKey] || "",
            text: req.body[textKey] || "",
            para: req.body[paraKey] || "",
          };
        } else {
          return homepageExist.images[index];
        }
      })
    );

    // Prepare updated data
    const homepageData = { images: imagesUrl, updatedAt: Date.now() };

    // Update the homepage
    const updatedHomepage = await homepageModel.findByIdAndUpdate(_id, homepageData, { new: true });

    res
      .status(200)
      .json({ success: true, message: "Homepage updated successfully", updatedHomepage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update homepage!" });
  }
};
