const express = require("express");
const multer = require("multer");
const path = require("path");
const Course = require("../../models/Course");
const verifyAdmin = require("../../middleware/auth");
const router = express.Router();
const {
  uploadToCloudinary,
  destroyFromCloudinary,
} = require("../../utils/uploadToCloudinary");

// Middleware to verify admin
router.use(verifyAdmin);
// Middleware to handle file uploads
// Multer configuration
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files allowed"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 🔒 POST /api/admin/courses/add
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) throw new Error("No image file uploaded");

    const result = await uploadToCloudinary(req.file.buffer, "courses");
    if (!result) {
      return res.status(500).json({ error: "Failed to upload image" });
    }
    const imageUrl = result.secure_url;
    const public_id = result.public_id;

    const { title, tafseel } = req.body;
    if (!title || !tafseel)
      return res.status(400).json({ message: "Title and tafseel required" });

    const newCourse = new Course({
      imageUrl,
      title,
      tafseel,
      imagePublicId: public_id,
    });
    await newCourse.save();

    res.status(201).json({ message: "Course added", newCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔒 DELETE /api/admin/courses/:id
router.delete("/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Please provide an ID" });
    }

    const { title, tafseel } = req.body;
    if (!title || !tafseel) {
      return res.status(400).json({ error: "Title and tafseel are required" });
    }

    // Find existing course
    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    let imageUrl = existingCourse.imageUrl;
    let public_id = existingCourse.imagePublicId;

    // If a new image is uploaded
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "courses");
      if (!result) {
        return res.status(500).json({ error: "Failed to upload image" });
      }
      destroyFromCloudinary(public_id);
      imageUrl = result.secure_url;
      public_id = result.public_id;
    }

    // Update course fields
    existingCourse.title = title;
    existingCourse.tafseel = tafseel;
    existingCourse.imageUrl = imageUrl;
    existingCourse.imagePublicId = public_id;

    await existingCourse.save();

    res.status(200).json({ message: "Course updated", course: existingCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
