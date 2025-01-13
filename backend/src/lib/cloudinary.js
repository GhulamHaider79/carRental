import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    // upload file on cloudinary
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "my_folder"
    });

    // file upload successfully 
    console.log("file upload on cloudinary", res);

    // Clean up local file after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return res
  } catch (error) {
    fs.unlinkSync(localFilePath)
    return error
  }
}

export default cloudinary;

//  export const imageUploader = async (iamageFiles) => {
//     try {
//       const uploadPromises = iamageFiles.map(async (file) => {
//         const b64 = Buffer.from(file.buffer).toString("base64");
//         let dataURI = "data:" + file.mimetype + ";base64," + b64;
//         const res = await cloudinary.v2.uploader.upload(dataURI);
//         return res.url;
//       });
//       const imageUrls = await Promise.all(uploadPromises);
//       return imageUrls;
//     } catch (error) {
//       fs.unlinkSync(localFilePath)
//       return null
//     }
//   }