import mongoose from "mongoose";

const aboutPageSchema = new mongoose.Schema({
  //  Hero Section
  link: { type: String },
  text1: { type: String, required: true },
  text1Color: { type: String, required: true },
  text2: { type: String, required: true },
  text2Color: { type: String, required: true },
  para: { type: String, required: true },
  paraColor: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonTextColor: { type: String, required: true },
  bgColor: { type: String, required: true },
  image: { type: String, required: true, default: "" },
  // bgImage: { type: String, required: true, default: "" },
});

const aboutPageModel = mongoose.models.aboutPage || mongoose.model("aboutPage", aboutPageSchema);

export default aboutPageModel;
