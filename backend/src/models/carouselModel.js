import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  link: { type: String, required: true }, // URL for the link (e.g., "/home")
  name: { type: String, required: true },
  image: { type: String, default: "" }, // URL for the logo
});

const carouselModel = mongoose.models.carousel || mongoose.model("carousel", carouselSchema);

export default carouselModel;
