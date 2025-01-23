import mongoose from "mongoose";

const aboutPage3Schema = new mongoose.Schema({
  text1: { type: String, required: true },
  text1Color: { type: String, required: true },
  text2: { type: String, required: true },
  text2Color: { type: String, required: true },
  para1: { type: String, required: true },
  para1Color: { type: String, required: true },
  para2: { type: String, required: true },
  para2Color: { type: String, required: true },
  image: { type: String, required: true, default: "" },
  num1: { type: Number, required: true },
  num2: { type: Number, required: true },
  bgColor: { type: String, required: true },
});

const aboutPage3Model = mongoose.models.aboutPage3 || mongoose.model("aboutPage3", aboutPage3Schema);

export default aboutPage3Model;
