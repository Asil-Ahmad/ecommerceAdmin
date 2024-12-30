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
