import { v2 as cloudinary } from "cloudinary";
import headerModel from "../models/headerModel.js";

export const addHeader = async (req, res) => {
    try {
        const { label1, label2, label3, label4 } = req.body;

        const logoFile = req.file; //!need to add file

        let logoUrl = "https://ui-avatars.com/api/?name=Default+Image"; //!if no file we get this url image else true we use user upload image
        if (logoFile) {
            const imageUpload = await cloudinary.uploader.upload(logoFile.path, {
                resource_type: "image",
            });
            logoUrl = imageUpload.secure_url;
        }

        const headerData = {
            label1,
            label2,
            label3,
            label4,
            logo: logoUrl,
        };
        const newHeader = new headerModel(headerData);
        await newHeader.save();
        console.log("This is newHeader", newHeader);

        res.status(200).json({ success: true, message: "Header added successfully", newHeader });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Failed to add header!" });
    }
};

export const updateHeader = async (req, res) => {
  try {
    const { name, _id } = req.body;

    //if no id
    if (!_id) {
      return res.status(400).json({ success: false, message: "Header ID is required!" });
    }

    //if no header with id?
    const headerExist = await headerModel.findById(_id);
    console.log("This is headerExist", headerExist);

    if (!headerExist) {
      return res.status(404).json({ success: false, message: "Header not found!" });
    }

    //if no file
    const logoFile = req.file;
    let logoUrl = headerExist.logo;

    if (logoFile) {
      const imageUpload = await cloudinary.uploader.upload(logoFile.path, {
        resource_type: "image",
      });
      logoUrl = imageUpload.secure_url;
    }

    const headerData = {
      name,
      logo: logoUrl,
    };

    const updatedHeader = await headerModel.findByIdAndUpdate(_id, headerData, { new: true });
    console.log("This is updatedHeader", updatedHeader);

    res.status(200).json({ success: true, message: "Header updated successfully", updatedHeader });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Failed to update header!" });
  }
};
