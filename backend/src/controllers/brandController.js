import brandModel from "../models/brandModel.js";
import upload from "../middleware/multer.js";
import { v2 as cloudinary } from "cloudinary";

export const addBrand = async (req, res) => {
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

    const brandData = {
      name,
      slug,
      description,
      thumbnail: thumbnailUrl,
      createdAt: Date.now(),
    };
    const newBrand = new brandModel(brandData);
    await newBrand.save();
    console.log("This is newBrand", newBrand);

    res.status(200).json({ success: true, message: "brand added successfully", newBrand });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to add brand!", error: error.message });
    console.log(error);
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { name, slug, description, _id } = req.body;

    //if no id
    if (!_id) {
      return res.status(400).json({ success: false, message: "brand ID is required!" });
    }

    //if no brand with id?
    const brandExist = await brandModel.findById(_id);
    console.log("This is brandExist", brandExist);

    if (!brandExist) {
      return res.status(404).json({ success: false, message: "brand not found!" });
    }

    //if no file
    const thumbnailFile = req.file;
    let thumbnailUrl = brandExist.thumbnail;

    //if file
    if (thumbnailFile) {
      const imageUpload = await cloudinary.uploader.upload(thumbnailFile.path, {
        resource_type: "image",
      });
      thumbnailUrl = imageUpload.secure_url;
    }

    //update brand or keep the same
    const brandData = {
      name: name || brandExist.name,
      slug: slug || brandExist.slug,
      description: description || brandExist.description,
      thumbnail: thumbnailUrl,
    };

    const updatedBrand = await brandModel.findByIdAndUpdate(_id, brandData, {
      new: true, // Return the updated document
    });

    res.status(200).json({ success: true, message: "brand updated successfully", updatedBrand });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to update brand!", error: error.message });
    console.log(error);
  }
};

export const getBrands = async (req, res) => {
  try {
    const Brands = await brandModel.find();
    res.status(200).json({ success: true, Brands });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to fetch categories!" });
    console.log(error);
  }
};

export const removebrand = async (req, res) => {
  try {
    const { id } = req.body;
    await brandModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "brand removed successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to remove brand!" });
    console.log(error);
  }
};
