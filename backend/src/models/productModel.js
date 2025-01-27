import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  tags: [{ type: String }],
  description: { type: String, required: true },
  short_description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  salePrice: { type: Number, default: 0 },
  stock: { type: Number, required: true, min: 0, default: null },
  images: [{ url: { type: String, required: true }, altText: { type: String, default: "" } }],
  selectedCategories: { type: String, required: true },
  // subCategory: { type: String, required: true },
  // sizes: { type: Array, required: true },
  createdAt: { type: Number, required: true },
  updatedAt: { type: Number, default: null },
  //sales Start-End
  isSaleEnabled: { type: Boolean, default: false }, // to check if the sale is enableddpp
  saleStart: { type: Number, default: null }, // Timestamp when the sale starts
  saleEnd: { type: Number, default: null },
  weight: { type: Number },
  dimensions: {
    dlength: { type: Number, default: null },
    dwidth: { type: Number, default: null },
    dheight: { type: Number, default: null },
  },
  //featured product
  featuredProduct: { type: Boolean, default: false },

  //images attributes,weight dimension status createdAtD,updatedAtD,slug
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
