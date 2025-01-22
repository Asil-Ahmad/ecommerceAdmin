import mongoose from "mongoose";

const aboutPageFeatureSchema = new mongoose.Schema({
  text1: { type: String, required: true },
  text2: { type: String, required: true },
  paraTitle1: { type: String, required: true },
  paraTitle2: { type: String, required: true },
  paraTitle3: { type: String, required: true },
  paraTitle4: { type: String, required: true },
  paraContent1: { type: String, required: true },
  paraContent2: { type: String, required: true },
  paraContent3: { type: String, required: true },
  paraContent4: { type: String, required: true },
  text2Content: { type: String, required: true },

   image1: { type: String, required: true, default: "" },
   image2: { type: String, required: true, default: "" },
});

const aboutPageFeatureModel =
  mongoose.models.aboutPageFeature || mongoose.model("aboutPageFeature", aboutPageFeatureSchema);

export default aboutPageFeatureModel;
