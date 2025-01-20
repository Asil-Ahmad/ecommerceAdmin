import mongoose from "mongoose";

const aboutPageFeatureSchema = new mongoose.Schema({
  //  Hero Section
  featureTitle: { type: String, required: true },
  featureList: {
    type: [
      {
        featurePara: { type: String, required: true },
        featureDesc: { type: String, required: true },
      },
    ],
    validate: [arrayLimit, "{PATH} exceeds the limit of 3"],
  },
  image1: { type: String, required: true, default: "" },
  image2: { type: String, required: true, default: "" },
});

const aboutPageFeatureModel = mongoose.models.aboutPageFeature || mongoose.model("aboutPageFeature", aboutPageFeatureSchema);

export default aboutPageFeatureModel;
