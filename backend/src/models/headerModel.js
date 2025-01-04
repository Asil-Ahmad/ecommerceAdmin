import mongoose from "mongoose";

const headerSchema = new mongoose.Schema({
  links: [
    {
      text: { type: String, required: true }, // Text for the link (e.g., "Home")
      url: { type: String, required: true },  // URL for the link (e.g., "/home")
    },
  ],
  logo: { type: String, default: "" }, // URL for the logo
});

const headerModel = mongoose.models.header || mongoose.model("header", headerSchema);

export default headerModel;
