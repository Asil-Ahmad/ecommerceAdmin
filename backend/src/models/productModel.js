import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  tags: [{ type: String }],
  description: { type: String, required: true },
  short_description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  salePrice: { type: Number, default: null },
  stock: { type: Number, required: true, min: 0 },
  images: [{ url: { type: String, required: true }, altText: { type: String, default: "" } }],
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  date: { type: Number, required: true },
  //images attributes,weight dimension status createdAtD,updatedAtD,slug
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
