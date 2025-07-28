const express = require("express");
const RegisterCategory = require("../../models/RegisterCategory");
const router = express.Router();

// Public: Get all categories structured with subcategories
router.get("/", async (req, res) => {
  try {
    // Fetch all non-removed categories
    const categories = await RegisterCategory.find();

    // Separate parents
    const parentCategories = categories.filter((cat) => !cat.parentId);

    // Map each parent with their subcategories
    const structuredCategories = parentCategories.map((parent) => {
      const children = categories.filter(
        (child) =>
          child.parentId && child.parentId.toString() === parent._id.toString()
      );

      return {
        _id: parent._id,
        name: parent.name,
        slug: parent.slug,
        createdAt: parent.createdAt,
        updatedAt: parent.updatedAt,
        subcategories: children.map((child) => ({
          _id: child._id,
          name: child.name,
          slug: child.slug,
          createdAt: child.createdAt,
          updatedAt: child.updatedAt,
        })),
      };
    });

    res.json(structuredCategories);
  } catch (err) {
    // console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
