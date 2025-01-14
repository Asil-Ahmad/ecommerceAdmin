import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema({
  images: [
    {
      url: { type: String, required: true }, // this is url for the image
      altText: { type: String, default: "" }, // alt text for the image for seo
      text1: { type: String, required: true }, // text1 to display on the image
      text2: { type: String, required: true }, // text2 to display on the image
    },
  ],
});

const homepageModel = mongoose.models.homepage || mongoose.model("homepage", homepageSchema);

export default homepageModel;
