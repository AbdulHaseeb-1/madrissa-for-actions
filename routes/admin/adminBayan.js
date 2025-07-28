const express = require("express");
const router = express.Router();
const Bayan = require("../../models/Bayan");
const verifyAdmin = require("../../middleware/auth");
const Bani = require("../../models/Bani");
const BayanCategory = require("../../models/BayanCategory");
const { body, validationResult } = require("express-validator");

// 🔒 Admin: Add new bayan
router.post("/add", verifyAdmin, async (req, res) => {
  const { slug, title, tafseel, date, writer, category, showDate } = req.body;

  if (
    !slug ||
    !title ||
    !tafseel ||
    !date ||
    !category ||
    !writer ||
    !showDate
  ) {
    return res.status(400).json({ message: "تمام فیلڈز لازمی ہیں" });
  }

  try {
    const existingBayan = await Bayan.findOne({ slug });
    if (existingBayan) {
      return res.status(400).json({
        message: "یہ سلاگ پہلے سے موجود ہے، براہ کرم ایک منفرد سلاگ منتخب کریں",
      });
    }

    const parsedDate = new Date(date).toDateString();

    const categoryDoc = await BayanCategory.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({ message: "منتخب کیٹیگری موجود نہیں ہے" });
    }

    let bayanObject = {
      slug,
      title,
      tafseel,
      date: parsedDate,
      category: category,
      categorySlug: categoryDoc.slug,
      bani: writer,
      showDate: showDate == "true" ? true : false,
    };

    const newBayan = new Bayan(bayanObject);
    await newBayan.save();

    res.status(201).json({ message: "بیان کامیابی سے شامل کیا گیا" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "سرور میں خرابی، براہ کرم دوبارہ کوشش کریں" });
  }
});

// 🔒 Admin: Update bayan
router.put(
  "/:slug",
  verifyAdmin,
  [
    body("title").notEmpty().trim().withMessage("Title is required"),
    body("tafseel").notEmpty().trim().withMessage("Tafseel is required"),
    body("date").notEmpty().isISO8601().withMessage("Valid date is required"),
    body("slug").notEmpty().trim().withMessage("Slug is required"),
    body("bani").notEmpty().trim().withMessage("Bani is required"),
    body("showDate").notEmpty().trim().withMessage("Bani is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, tafseel, date, slug, bani, category, showDate } = req.body;

      const updatedBayan = {
        title,
        tafseel,
        date,
        slug,
        bani,
        showDate: showDate == "true" ? true : false,
      };

      // Include optional fields if provided
      if (category) updatedBayan.category = category;

      // Find and update the Bayan by slug
      const updated = await Bayan.findOneAndUpdate(
        { slug: req.params.slug },
        updatedBayan,
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ error: "Bayan not found" });
      }

      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// 🔒 Admin: Delete bayan
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Bayan.findByIdAndDelete(req.params.id);
    res.json({ message: "Bayan deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting bayan", error: err.message });
  }
});

module.exports = router;
