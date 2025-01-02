import upload from "../middleware/multer.js";
import { v2 as cloudinary } from "cloudinary"; //add image
import productModel from "../models/productModel.js";

//function for add products
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      selectedCategories,
      subCategory,
      sizes,
      sku,
      tags,
      short_description,
      salePrice,
      stock,
      isSaleEnabled,
      saleStart,
      saleEnd,
      weight,
      dimensions,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image1 && req.files.image2[0];
    const image3 = req.files.image1 && req.files.image3[0];
    const image4 = req.files.image1 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item, index) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        const altTextKey = `altText${index + 1}`; // Expect keys like altText1, altText2, etc.
        return {
          url: result.secure_url,
          altText: req.body[altTextKey] || item.originalname || "", // Use custom altText or fallback to filename
        };
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      selectedCategories,
      images: imagesUrl,
      createdAt: Date.now(),
      sku,
      tags,
      short_description,
      salePrice,
      stock,
      isSaleEnabled: saleStart && saleEnd ? true : false,
      saleStart,
      saleEnd,
      weight,
      dimensions: dimensions
        ? {
            dlength: dimensions.dlength,
            dwidth: dimensions.dwidth,
            dheight: dimensions.dheight,
          }
        : { dlength: null, dwidth: null, dheight: null },

      // sizes: JSON.parse(sizes),
      // subCategory,
    };
    console.log(productData);

    const products = new productModel(productData);
    await products.save();

    res.status(200).json({ success: true, message: "Product added successfully", products });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to add product!", error: error });
    console.log(error);
  }
};

//list of products
const listProducts = async (req, res) => {
  try {
    const listAllProducts = await productModel.find({});
    res.status(200).json({ success: true, products: listAllProducts });
  } catch (error) {
    res.status(400).json({ success: false, message: "An error occured!" });
  }
};

//todo Update Products
const updateProduct = async (req, res) => {
  try {
    const {
      _id,
      name,
      description,
      short_description,
      price,
      selectedCategories,
      sku,
      salePrice,
      stock,
      weight,
      dimensions,
      isSaleEnabled,
      saleStart,
      saleEnd,
    } = req.body;

    if (!_id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = [];
    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (item, index) => {
          const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
          const altTextKey = `altText${index + 1}`; // Expect keys like altText1, altText2, etc.
          return {
            url: result.secure_url,
            altText: req.body[altTextKey] || item.originalname || "", // Use custom altText or fallback to filename
          };
        })
      );
    }

    // Fetch existing product data
    const existingProduct = await productModel.findById(_id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Prepare updated product data
    const productData = {
      name: name || existingProduct.name,
      description: description || existingProduct.description,
      short_description: short_description || existingProduct.short_description,
      price: price ? Number(price) : existingProduct.price,
      selectedCategories: selectedCategories || existingProduct.selectedCategories,
      sku: sku || existingProduct.sku,
      salePrice: salePrice || existingProduct.salePrice,
      stock: stock || existingProduct.stock,
      images: imagesUrl.length > 0 ? imagesUrl : existingProduct.images, // Keep existing images if no new ones
      weight: weight || existingProduct.weight,
      dimensions: dimensions || existingProduct.dimensions,
      isSaleEnabled: saleStart && saleEnd ? true : false,
      saleStart: saleStart || existingProduct.saleStart,
      saleEnd: saleEnd || existingProduct.saleEnd,
      updatedAt: Date.now(),
    };

    // Update the product
    const updatedProduct = await productModel.findByIdAndUpdate(_id, productData, {
      new: true, // Return the updated document
    });
    console.log("Updated Product", updatedProduct);

    res
      .status(200)
      .json({ success: true, message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update product", error: error.message });
    console.log(error);
  }
};

//todo Remove Products
const removeProducts = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Successfully removed the product" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Product not found" });
  }
};

//todo info of single product
const singleProducts = async (req, res) => {
  const { id } = req.body;
  try {
    const itemInfo = await productModel.findOne({ id });
    res.status(200).json({ message: "success", data: itemInfo });
  } catch (error) {}
};

export { addProduct, listProducts, removeProducts, updateProduct, singleProducts };
