const cloudinary = require("cloudinary").v2;
const { config } = require("dotenv");
config(); // Load .env

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file to Cloudinary.
 * @param {Buffer} fileBuffer - The file buffer to upload.
 * @param {string} folder - The folder in Cloudinary to upload the file to.
 * @returns {Promise<string>} - The URL of the uploaded file.
 */

const uploadToCloudinary = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) {
          // console.error("Error uploading to Cloudinary:", error);
          return reject(error);
        }
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      })
      .end(fileBuffer);
  });
};

const destroyFromCloudinary = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .destroy(publicId)
      .then(() => {
        resolve({ success: true });
      })
      .catch(() => {
        reject({ success: false });
      });
  });
};

module.exports = { uploadToCloudinary, destroyFromCloudinary };
