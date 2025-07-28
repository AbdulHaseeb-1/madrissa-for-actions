const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");

// Public: Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    // console.error("❌ Error in GET /api/courses:", error.message);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

router.get("/details/:id", async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.json(course);
  } catch (err) {
    // console.error("❌ Error in GET /api/courses/:id:", err.message);
    return res
      .status(500)
      .json({ message: "Internal server error", details: err?.message });
  }
});

module.exports = router;
