import mongoose from "mongoose";

const aboutPageFeatureSchema = new mongoose.Schema({
  title1: { type: String, required: true },
  title2: { type: String, required: true },
  title2para: { type: String, required: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  content: {
    paraTitle: [{ type: String, required: true }],
    paraContent: [{ type: String, required: true }],
  },
});

const aboutPageFeatureModel =
  mongoose.models.aboutPageFeature || mongoose.model("aboutPageFeature", aboutPageFeatureSchema);

export default aboutPageFeatureModel;
