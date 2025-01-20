import { v2 as cloudinary } from "cloudinary";

import upload from "../../middleware/multer.js";
import aboutPageModel from "../../models/aboutPageUI/aboutPageModel.js";

export const addAboutPage = async (req, res) => {
  const { link, text, para, buttonText, bgColor } = req.body;

  if (!text || !para || !buttonText || !bgColor) {
    return res.status(400).json({ success: false, message: "Missing credentials" });
  }
  try {
    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const aboutPageData = {
      link,
      text,
      para,
      buttonText,
      bgColor,
      image: imageUpload.secure_url,
    };
    const aboutPage = aboutPageModel(aboutPageData);
    await aboutPage.save();

    res.status(200).json({ success: true, message: "About page added successfully", aboutPage });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to add song", error: error.message });
  }
};

export const getAboutPage = async (req, res) => {
  try {
    const aboutPage = await aboutPageModel.find();
    res.status(200).json({ success: true, aboutPage });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to fetch about page", error: error.message });
  }
};

export const updateAboutPage = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ success: false, message: "Missing credentials" });
  }

  const { link, text, para, buttonText, bgColor } = req.body;
  if (!text || !para || !buttonText || !bgColor) {
    return res.status(400).json({ success: false, message: "Missing credentials" });
  }
  try {
    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const aboutPageData = {
      link,
      text,
      para,
      buttonText,
      bgColor,
      image: imageUpload.secure_url,
    };
    const aboutPage = await aboutPageModel.findByIdAndUpdate(id, aboutPageData, { new: true });
    res.status(200).json({ success: true, message: "About page updated successfully", aboutPage });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to update about page", error: error.message });
  }
};
