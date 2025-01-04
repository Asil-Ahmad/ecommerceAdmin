import mongoose from "mongoose";

const headerSchema = new mongoose.Schema({
  label1: {
    text: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  label2: {
    text: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  label3: {
    text: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  label4: {
    text: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  logo: { type: String },
});

const headerModel = mongoose.models.header || mongoose.model("header", headerSchema);

export default headerModel;
