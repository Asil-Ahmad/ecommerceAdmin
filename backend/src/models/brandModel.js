import mongoose from "mongoose";
import slugify from "slugify";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "No description provided",
    },
    thumbnail: { type: String },
    // parent: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "brand",
    //   default: null,
    // },
    // displayType: {
    //   type: String,
    //   enum: ["products", "subcategories", "both"],
    //   default: "products",
    // },
    // menuOrder: {
    //   type: Number,
    //   default: 0,
    // },
    // metaTitle: {
    //   type: String,
    //   trim: true,
    // },
    // metaDescription: {
    //   type: String,
    //   trim: true,
    // },
    // status: {
    //   type: String,
    //   enum: ["active", "inactive"],
    //   default: "active",
    // },
    // path: {
    //   type: String,
    //   trim: true,
    // },
    // level: {
    //   type: Number,
    //   default: 0,
    // },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    // showInMenu: {
    //   type: Boolean,
    //   default: true,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from name if not provided
brandSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const brandModel = mongoose.models.brand || mongoose.model("brand", brandSchema);

export default brandModel;
