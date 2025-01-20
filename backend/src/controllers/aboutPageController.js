import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";
import upload from "../middleware/multer.js";

export const addAboutPage = async (req, res) => {
  const { link, text, para, buttonText, bgColor } = req.body;

  if (link === "" || text === "" || para === "" || buttonText === "" || bgColor === "") {
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
    const aboutPage = addAboutPage(aboutPageData);
    await aboutPage.save();

    res.status(200).json({ success: true, message: "About page added successfully", aboutPage });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to add song", error: error.message });
  }
};
