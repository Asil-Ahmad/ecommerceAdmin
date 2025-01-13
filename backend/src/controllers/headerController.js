import { v2 as cloudinary } from "cloudinary";
import headerModel from "../models/headerModel.js";

export const addHeader = async (req, res) => {
  try {
    const { links } = req.body; // Dynamic array of links
    const logoFile = req.file; // Uploaded file for the logo

    // Default logo URL
    let logoUrl = "https://ui-avatars.com/api/?name=Default+Image";

    // If a file is uploaded, upload it to Cloudinary
    if (logoFile) {
      const imageUpload = await cloudinary.uploader.upload(logoFile.path, {
        resource_type: "image",
      });
      logoUrl = imageUpload.secure_url;
    }

    // Validate and prepare the data
    if (!links || !Array.isArray(links) || links.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Links are required and should be an array.",
      });
    }

    const headerData = {
      links,
      logo: logoUrl,
    };
    console.log("This is headerData", headerData);

    // Save the data to the database
    const newHeader = new headerModel(headerData);
    await newHeader.save();
    console.log("This is newHeader", newHeader);
    res.status(200).json({
      success: true,
      message: "Header added successfully",
      newHeader,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to add header!",
    });
  }
};

export const updateHeader = async (req, res) => {
  try {
    const { links: linksString, _id } = req.body;

    // If no ID provided
    if (!_id) {
      return res.status(400).json({ success: false, message: "Header ID is required!" });
    }

    // Check if the header exists
    const headerExist = await headerModel.findById(_id);
    if (!headerExist) {
      return res.status(404).json({ success: false, message: "Header not found!" });
    }

    // Process logo upload (if file is provided)
    const logoFile = req.file;
    let logoUrl = headerExist.logo;
    if (logoFile) {
      const imageUpload = await cloudinary.uploader.upload(logoFile.path, {
        resource_type: "image",
      });
      logoUrl = imageUpload.secure_url;
    }

    // Parse `links` from stringified JSON
    let links = [];
    if (linksString) {
      try {
        links = JSON.parse(linksString);
      } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid links format!" });
      }
    }

    // Prepare updated data
    const headerData = {
      logo: logoUrl,
      ...(links.length > 0 && { links }),
    };

    // Update the header
    const updatedHeader = await headerModel.findByIdAndUpdate(_id, headerData, { new: true });

    res.status(200).json({ success: true, message: "Header updated successfully", updatedHeader });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Failed to update header!" });
  }
};

export const getHeader = async (req, res) => {
  try {
    const header = await headerModel.findOne();
    res.status(200).json({ success: true, header });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Failed to get header!" });
  }
};
