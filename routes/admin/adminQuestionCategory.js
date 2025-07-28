const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const QuestionCategory = require("../../models/QuestionCategory");

// Create category
router.post("/add", auth, async (req, res) => {
  const { name, slug, parentId } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }
  try {
    let chk_slug = await QuestionCategory.findOne({ slug: slug });
    // console.log(chk_slug);

    if (chk_slug) {
      return res.status(409).json({ message: "Slug Already Used" });
    }

    const category = new QuestionCategory({ name, slug, parentId });
    await category.save();
    return res.status(201).json({ message: "Category created", category });
  } catch (err) {
    // console.error("Error creating category:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update category
router.put("/:slug", auth, async (req, res) => {
  const { name, slug } = req.body;
  const pre_slug = req.params.slug;

  if (!name || !slug) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }

  try {
    const updated = await QuestionCategory.findOneAndUpdate(
      { slug: pre_slug }, // Corrected this part
      { name, slug },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Category not found" });

    res.json(updated);
  } catch (err) {
    // console.error("Error updating category:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete category and its subcategories
router.delete("/:slug", auth, async (req, res) => {
  try {
    const slug = req.params.slug;

    // Delete the parent category
    const deletedCategory = await QuestionCategory.findOneAndDelete({ slug });

    if (!deletedCategory)
      return res.status(404).json({ message: "Category not found" });

    // Delete subcategories that have this category as parent
    await QuestionCategory.deleteMany({ parentId: deletedCategory._id });

    res.json({
      message: "Category deleted successfully",
    });
  } catch (err) {
    // console.error("Error deleting category ", err);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
});

module.exports = router;
