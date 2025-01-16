import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
  ],
});

const carouselModel = mongoose.models.carousel || mongoose.model("carousel", carouselSchema);

export default carouselModel;
