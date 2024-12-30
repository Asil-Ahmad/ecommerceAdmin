import categoryModel from "../models/categoryModel.js";

export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryData = { name, description, createdAt: Date.now() };
    const newCategory = new categoryModel(categoryData);
    await newCategory.save();
    res.status(200).json({ success: true, message: "Category added successfully", newCategory });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to add category!", error: error.message });
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
