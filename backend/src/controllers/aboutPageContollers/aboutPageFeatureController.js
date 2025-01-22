import upload from "../../middleware/multer.js";
import { v2 as cloudinary } from "cloudinary";
import aboutPageFeatureModel from "../../models/aboutPageUI/aboutPageFeatureModel.js";

// Create a new about page feature
export const createAboutPageFeature = async (req, res) => {
  const {
    text1,
    text2,
    paraTitle1,
    paraTitle2,
    paraTitle3,
    paraTitle4,
    paraContent1,
    paraContent2,
    paraContent3,
    paraContent4,
    text2Content,
  } = req.body;
  const imageFile1 = req.files?.image1?.[0];
  const imageFile2 = req.files?.image2?.[0];

  if (
    !text1 ||
    !text2 ||
    !paraTitle1 ||
    !paraTitle2 ||
    !paraTitle3 ||
    !paraTitle4 ||
    !paraContent1 ||
    !paraContent2 ||
    !paraContent3 ||
    !paraContent4 ||
    !text2Content
  ) {
    return res.status(400).json({ message: "Missing credentials" });
  }
  try {
    let image1Url = "";
    let image2Url = "";

    if (imageFile1) {
      const imageUpload = await cloudinary.uploader.upload(imageFile1.path, {
        resource_type: "image",
      });
      image1Url = imageUpload.secure_url;
    }

    if (imageFile2) {
      const imageUpload2 = await cloudinary.uploader.upload(imageFile2.path, {
        resource_type: "image",
      });
      image2Url = imageUpload2.secure_url;
    }

    const newFeature = new aboutPageFeatureModel({
      text1,
      text2,
      paraTitle1,
      paraTitle2,
      paraTitle3,
      paraTitle4,
      paraContent1,
      paraContent2,
      paraContent3,
      paraContent4,
      text2Content,
      image1: image1Url,
      image2: image2Url,
    });
    console.log(newFeature);

    await newFeature.save();
    res.status(201).json(newFeature);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

// Update an existing about page feature
export const updateAboutPageFeature = async (req, res) => {
  try {
    const {
      id,
      text1,
      text2,
      paraTitle1,
      paraTitle2,
      paraTitle3,
      paraTitle4,
      paraContent1,
      paraContent2,
      paraContent3,
      paraContent4,
      text2Content,
    } = req.body;

    const featureExist = await aboutPageFeatureModel.findById(id);
    if (!featureExist) {
      return res.status(404).json({ message: "Feature not found" });
    }

    const imageFile1 = req.files?.image1?.[0];
    const imageFile2 = req.files?.image2?.[0];

    let image1Url = featureExist.image1;
    let image2Url = featureExist.image2;

    if (imageFile1) {
      const imageUpload1 = await cloudinary.uploader.upload(imageFile1.path, {
        resource_type: "image",
      });
      image1Url = imageUpload1.secure_url;
    }

    if (imageFile2) {
      const imageUpload2 = await cloudinary.uploader.upload(imageFile2.path, {
        resource_type: "image",
      });
      image2Url = imageUpload2.secure_url;
    }

    const updatedFeature = await aboutPageFeatureModel.findByIdAndUpdate(
      id,
      {
        image1: image1Url,
        image2: image2Url,
        text1: text1 || featureExist.text1,
        text2: text2 || featureExist.text2,
        paraTitle1: paraTitle1 || featureExist.paraTitle1,
        paraTitle2: paraTitle2 || featureExist.paraTitle2,
        paraTitle3: paraTitle3 || featureExist.paraTitle3,
        paraTitle4: paraTitle4 || featureExist.paraTitle4,
        paraContent1: paraContent1 || featureExist.paraContent1,
        paraContent2: paraContent2 || featureExist.paraContent2,
        paraContent3: paraContent3 || featureExist.paraContent3,
        paraContent4: paraContent4 || featureExist.paraContent4,
        text2Content: text2Content || featureExist.text2Content,
      },
      { new: true }
    );

    res.status(200).json(updatedFeature);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// Get a single about page feature by ID
export const getAboutPageFeature = async (req, res) => {
  try {
    const feature = await aboutPageFeatureModel.findOne();
    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }
    res.status(200).json(feature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
