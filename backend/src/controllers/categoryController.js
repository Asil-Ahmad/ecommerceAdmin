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
    const { name, slug, description, _id } = req.body;

    //if no id
    if (!_id) {
      return res.status(400).json({ success: false, message: "Category ID is required!" });
    }

    //if no category with id?
    const categoryExist = await categoryModel.findById(_id);
    console.log("This is categoryExist", categoryExist);

    if (!categoryExist) {
      return res.status(404).json({ success: false, message: "Category not found!" });
    }

    //if no file
    const thumbnailFile = req.file;
    let thumbnailUrl = categoryExist.thumbnail;

    //if file
    if (thumbnailFile) {
      const imageUpload = await cloudinary.uploader.upload(thumbnailFile.path, {
        resource_type: "image",
      });
      thumbnailUrl = imageUpload.secure_url;
    }

    //update category or keep the same
    const categoryData = {
      name: name || categoryExist.name,
      slug: slug || categoryExist.slug,
      description: description || categoryExist.description,
      thumbnail: thumbnailUrl,
    };

    const updatedCategory = await categoryModel.findByIdAndUpdate(_id, categoryData, {
      new: true, // Return the updated document
    });

    res
      .status(200)
      .json({ success: true, message: "Category updated successfully", updatedCategory });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to update category!", error: error.message });
    console.log(error);
  }
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
