import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema({
  images: [
    {
      url: { type: String, required: true },
      altText: { type: String, default: "" },
      text: { type: String, default: "" },
    },
  ],
});

const homepageModel = mongoose.models.homepage || mongoose.model("homepage", homepageSchema);

export default homepageModel;
