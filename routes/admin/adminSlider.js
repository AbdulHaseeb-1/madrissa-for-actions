const express = require("express");
const multer = require("multer");
const auth = require("../../middleware/auth");
const {
  uploadToCloudinary,
  destroyFromCloudinary,
} = require("../../utils/uploadToCloudinary");
const Slider = require("../../models/Slider");

const router = express.Router();

// Use memory storage for multer since we'll be sending to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files allowed"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.use(auth);

// Upload image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No valid file uploaded" });

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, "slider");

    if (!result) {
      return res.status(500).json({ error: "Failed to upload image" });
    }

    const imageUrl = result.secure_url;
    const publicId = result.public_id;

    // Add the new image details to our list

    const newImage = new Slider({
      imageUrl,
      imagePublicId: publicId,
    });
    await newImage.save();

    res.status(201).json({ message: "Image added", newImage });
  } catch (error) {
    // console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// // Delete image
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json("No Id provided");
    }

    const image = await Slider.findById(id);

    const result = await destroyFromCloudinary(image.imagePublicId);

    if (!result.success) {
      return res.status(500).json("Failed to delete image");
    }

    const r = await Slider.findByIdAndDelete(id);

    // Delete from Cloudinary

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    // console.error("De/lete error:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

// Replace image
// router.post('/replace', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: 'No new file uploaded' });

//     const { publicId } = req.body;
//     if (!publicId) return res.status(400).json({ error: 'No public_id provided' });

//     // Read existing images
//     let images = fs.existsSync(sliderFilePath)
//       ? JSON.parse(fs.readFileSync(sliderFilePath, 'utf-8'))
//       : [];

//     // Find the image to replace
//     const imageIndex = images.findIndex(img => img.public_id === publicId);

//     if (imageIndex === -1) {
//       return res.status(404).json({ error: 'Image not found' });
//     }

//     // Delete old image from Cloudinary
//     const cloudinary = require('cloudinary').v2;
//     await cloudinary.uploader.destroy(publicId);

//     // Upload new image to Cloudinary
//     const result = await uploadToCloudinary(req.file.buffer, 'slider');

//     // Update our list
//     images[imageIndex] = {
//       public_id: result.public_id,
//       secure_url: result.secure_url
//     };

//     // Save the updated list
//     fs.writeFileSync(sliderFilePath, JSON.stringify(images));

//     res.json({
//       message: 'Image replaced successfully',
//       image: {
//         public_id: result.public_id,
//         secure_url: result.secure_url
//       }
//     });
//   } catch (error) {
//     console.error('Replace error:', error);
//     res.status(500).json({ error: 'Failed to replace image' });
//   }
// });

module.exports = router;
