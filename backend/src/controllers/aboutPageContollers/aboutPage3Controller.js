import { v2 as cloudinary } from "cloudinary";
import upload from "../../middleware/multer.js";
import aboutPage3Model from "../../models/aboutPageUI/aboutPage3.js";

export const addAboutPage3 = async (req, res) => {
  const {
    text1,
    text1Color,
    text2,
    text2Color,
    para1,
    para1Color,
    para2,
    para2Color,
    num1,
    num2,
    bgColor,
  } = req.body;

  if (
    !text1 ||
    !text1Color ||
    !text2 ||
    !text2Color ||
    !para1 ||
    !para1Color ||
    !para2 ||
    !para2Color ||
    !num1 ||
    !num2 ||
    !bgColor
  ) {
    return res.status(400).json({ success: false, message: "Missing credentials" });
  }
  try {
    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const aboutPageData = {
      text1,
      text1Color,
      text2,
      text2Color,
      para1,
      para1Color,
      para2,
      para2Color,
      num1,
      num2,
      bgColor,
      image: imageUpload.secure_url,
    };
    const aboutPage = new aboutPage3Model(aboutPageData);
    await aboutPage.save();

    res.status(200).json({ success: true, message: "About page added successfully", aboutPage });
  } catch (error) {
    console.log(error);

    res
      .status(400)
      .json({ success: false, message: "Failed to add about page", error: error.message });
  }
};

export const getAboutPage3 = async (req, res) => {
  try {
    const aboutPage = await aboutPage3Model.findOne();
    res.status(200).json({ success: true, aboutPage });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to fetch about page", error: error.message });
  }
};

export const updateAboutPage3 = async (req, res) => {
  try {
    const {
      id,
      text1,
      text1Color,
      text2,
      text2Color,
      para1,
      para1Color,
      para2,
      para2Color,
      num1,
      num2,
      bgColor,
    } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "About page ID is required!" });
    }

    const aboutPageExist = await aboutPage3Model.findById(id);
    if (!aboutPageExist) {
      return res.status(404).json({ success: false, message: "About page not found!" });
    }

    const imageFile = req.file;
    let imageUrl = aboutPageExist.image;

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }

    const aboutPageData = {
      text1: text1 || aboutPageExist.text1,
      text1Color: text1Color || aboutPageExist.text1Color,
      text2: text2 || aboutPageExist.text2,
      text2Color: text2Color || aboutPageExist.text2Color,
      para1: para1 || aboutPageExist.para1,
      para1Color: para1Color || aboutPageExist.para1Color,
      para2: para2 || aboutPageExist.para2,
      para2Color: para2Color || aboutPageExist.para2Color,
      num1: num1 || aboutPageExist.num1,
      num2: num2 || aboutPageExist.num2,
      bgColor: bgColor || aboutPageExist.bgColor,
      image: imageUrl,
    };

    const updatedAboutPage = await aboutPage3Model.findByIdAndUpdate(id, aboutPageData, {
      new: true,
    });

    res
      .status(200)
      .json({ success: true, message: "About page updated successfully", updatedAboutPage });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to update about page", error: error.message });
  }
};
