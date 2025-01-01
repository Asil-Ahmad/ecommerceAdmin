import categoryModel from "../models/categoryModel.js";
import upload from "../middleware/multer.js";
import { v2 as cloudinary } from "cloudinary";

export const addCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    // const thumbnailFile = req.file;

    const thumbnailFile = req.file; //!need to add file

    let thumbnailUrl = "https://ui-avatars.com/api/?name=Default+Image"; //!if no file we get this url image else true we use user upload image
    if (thumbnailFile) {
      const imageUpload = await cloudinary.uploader.upload(thumbnailFile.path, {
        resource_type: "image",
      });
      thumbnailUrl = imageUpload.secure_url;
    }

    const categoryData = {
      name,
      slug,
      description,
      thumbnail: thumbnailUrl,
      createdAt: Date.now(),
    };
    const newCategory = new categoryModel(categoryData);
    await newCategory.save();
    console.log("This is newCategory", newCategory);

    res.status(200).json({ success: true, message: "Category added successfully", newCategory });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to add category!", error: error.message });
    console.log(error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, slug, description, id } = req.body;
    const category = await categoryModel.findById(id);
    category.name = name;
  } catch (error) {}
};

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to fetch categories!" });
    console.log(error);
  }
};

export const removeCategory = async (req, res) => {
  try {
    const { id } = req.body;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Category removed successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to remove category!" });
    console.log(error);
  }
};
