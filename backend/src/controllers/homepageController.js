import { v2 as cloudinary } from "cloudinary";
import homepageModel from "../models/homepageModel.js";


export const addHomepage = async (req, res) => {
    try {
        const { images } = req.body; // Dynamic array of images
        const imageFiles = req.files; // Uploaded files for the images
    
        // Validate and prepare the data
        if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Images are required and should be an array.",
        });
        }
    
        // Prepare the array to store the image data
        const imagesArray = [];
    
        // Loop through the uploaded files
        for (const file of imageFiles) {
        const imageUpload = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
        });
    
        // Prepare the image data
        const imageData = {
            url: imageUpload.secure_url,
            altText: file.originalname,
            text1: images[imageFiles.indexOf(file)].text1,
            text2: images[imageFiles.indexOf(file)].text2,
        };
    
        // Push the image data to the array
        imagesArray.push(imageData);
        }
    
        // Save the data to the database
        const newHomepage = new homepageModel({ images: imagesArray });
        await newHomepage.save();
        res.status(200).json({
        success: true,
        message: "Homepage added successfully",
        newHomepage,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
        success: false,
        message: "Failed to add homepage!",
        });
    }
}