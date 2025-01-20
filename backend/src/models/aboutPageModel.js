import mongoose from "mongoose";

const aboutPageSchema = new mongoose.Schema({
  link: { type: String, required: true }, // URL for the link (e.g., "/home")
  text: { type: String, required: true },
  para: { type: String, required: true },
  buttonText: { type: String, required: true },
  bgColor: { type: String, required: true },
  image: { type: String, required: true, default: "" }, // URL for the logo
});

const aboutPageModel = mongoose.models.aboutPage || mongoose.model("aboutPage", aboutPageSchema);

export default aboutPageModel;
