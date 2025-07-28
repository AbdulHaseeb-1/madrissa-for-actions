const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const KitaabCategory = require("../../models/KitaabCategory");

// Create category
router.post("/add", auth, async (req, res) => {
  const { name, slug, parentId } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }

  try {
    let chk_slug = await KitaabCategory.findOne({ slug: slug });

    if (chk_slug) {
      return res.status(409).json({ message: "Slug Already Used" });
    }

    const category = new KitaabCategory({ name, slug, parentId });
    await category.save();
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update category
router.put("/:slug", auth, async (req, res) => {
  const { name, slug } = req.body;

  if (!name || !slug) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }

  try {
    const updated = await KitaabCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Category not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Soft Delete category
router.delete("/:slug", auth, async (req, res) => {
  try {
    const slug = req.params.slug;

    const deletedCategory = await KitaabCategory.findOneAndDelete({ slug });

    if (!deletedCategory)
      return res.status(404).json({ message: "Category not found" });

    await KitaabCategory.deleteMany({ parentId: deletedCategory._id });

    res.json({
      message: "Category deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
