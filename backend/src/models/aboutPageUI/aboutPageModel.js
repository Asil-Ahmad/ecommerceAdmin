import mongoose from "mongoose";

const aboutPageSchema = new mongoose.Schema({
  //  Hero Section
  link: { type: String }, // URL for the link (e.g., "/home")
  text: { type: String, required: true },
  para: { type: String, required: true },
  buttonText: { type: String, required: true },
  // bgColor: { type: String, required: true },
  image: { type: String, required: true, default: "" }, // URL for the logo
  // bgImage: { type: String, required: true, default: "" }, // URL for the logo
  // //Feature Section
  // featureTitle: { type: String, required: true },
  // featurePara: { type: String, required: true },
  // featureDesc: { type: String, required: true },
});

const aboutPageModel = mongoose.models.aboutPage || mongoose.model("aboutPage", aboutPageSchema);

export default aboutPageModel;
