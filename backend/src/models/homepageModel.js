import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema({
  images: [
    {
      url: { type: String, required: true },
      altText: { type: String, default: "" },
      text1: { type: String, required: true },
      text2: { type: String, required: true },
    },
  ],
});

const homepageModel = mongoose.models.homepage || mongoose.model("homepage", homepageSchema);

export default homepageModel;
