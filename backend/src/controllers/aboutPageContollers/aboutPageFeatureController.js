import upload from "../../middleware/multer.js";
import { v2 as cloudinary } from "cloudinary";
import aboutPageFeatureModel from "../../models/aboutPageFeatureModel";

// Create a new about page feature
export const createAboutPageFeature = async (req, res) => {
    try {
        const { title1, title2, title2para, content } = req.body;

        if (!title1 || !title2 || !title2para || !content) {
            return res.status(400).json({ message: "Missing credentials" });
        }

        const imageFile1 = req.files?.image1;
        const imageFile2 = req.files?.image2;

        let image1Url = "";
        let image2Url = "";

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

        const newFeature = new aboutPageFeatureModel({
            title1,
            title2,
            title2para,
            image1: image1Url,
            image2: image2Url,
            content,
        });

        await newFeature.save();
        res.status(201).json(newFeature);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing about page feature
export const updateAboutPageFeature = async (req, res) => {
    try {
        const { id } = req.params;
        const { title1, title2, title2para, content } = req.body;

        const featureExist = await aboutPageFeatureModel.findById(id);
        if (!featureExist) {
            return res.status(404).json({ message: "Feature not found" });
        }

        const imageFile1 = req.files?.image1;
        const imageFile2 = req.files?.image2;

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
                title1: title1 || featureExist.title1,
                title2: title2 || featureExist.title2,
                title2para: title2para || featureExist.title2para,
                image1: image1Url,
                image2: image2Url,
                content: content || featureExist.content,
            },
            { new: true }
        );

        res.status(200).json(updatedFeature);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single about page feature by ID
export const getAboutPageFeature = async (req, res) => {
    try {
        const { id } = req.params;
        const feature = await aboutPageFeatureModel.findById(id);
        if (!feature) {
            return res.status(404).json({ message: "Feature not found" });
        }
        res.status(200).json(feature);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
