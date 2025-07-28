const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Question = require("../../models/Question");
const auth = require("../../middleware/auth");
const QuestionCategory = require("../../models/QuestionCategory");

router.post("/add", auth, async (req, res) => {
  const {
    question,
    title,
    slug,
    answer,
    category,
    fatwaTitle,
    fatwaNumber,
    kitaab,
    askerName,
    muftiName,
    registrationNumber,
    date,
    showDate,
  } = req.body;

  if (
    !question ||
    !title ||
    !slug ||
    !answer ||
    !category ||
    !fatwaNumber ||
    !fatwaTitle ||
    !kitaab ||
    !registrationNumber ||
    !muftiName ||
    !askerName ||
    !date ||
    !showDate
  ) {
    return res.status(400).json("Somethign is worng");
  }

  try {
    // Check if category exists

    const categoryDoc = await QuestionCategory.findById(category);

    if (!categoryDoc) {
      return res.status(404).json({ error: "Category not found." });
    }

    const categorySlug = categoryDoc.slug;

    const newQuestion = new Question({
      title,
      question,
      slug,
      answer,
      category,
      categorySlug,
      fatwaTitle,
      fatwaNumber,
      kitaab,
      askerName,
      muftiName,
      registrationNumber,
      date,
      showDate,
    });

    await newQuestion.save();

    return res.status(201).json({
      message: "Question added successfully.",
      newQuestion,
    });
  } catch (err) {
    // console.error("Error adding question:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Update a question
router.put(
  "/:slug",
  auth,
  [
    body("title").notEmpty().trim().withMessage("Title is required"),
    body("question").notEmpty().trim().withMessage("Question is required"),
    body("answer").notEmpty().trim().withMessage("Answer is required"),
    body("fatwaTitle").notEmpty().trim().withMessage("Fatwa title is required"),
    body("fatwaNumber")
      .notEmpty()
      .trim()
      .withMessage("Fatwa number is required"),
    body("slug").notEmpty().trim().withMessage("Slug is required"),
    body("registrationNumber")
      .notEmpty()
      .trim()
      .withMessage("registrationNumber is required"),
    body("kitaab").notEmpty().trim().withMessage("kitaab is required"),
    body("muftiName").notEmpty().trim().withMessage("muftiName is required"),
    body("askerName").notEmpty().trim().withMessage("askerName is required"),
    body("date").notEmpty().trim().withMessage("date is required"),
    body("showDate").notEmpty().trim().withMessage("date is required"),
    // body("category").optional().isMongoId().withMessage("Invalid category ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        category,
        question,
        answer,
        fatwaTitle,
        fatwaNumber,
        title,
        slug,
        kitaab,
        muftiName,
        registrationNumber,
        askerName,
        date,
        showDate,
      } = req.body;

      const updatedQuestion = {
        question,
        answer,
        fatwaNumber,
        fatwaTitle,
        slug,
        title,
        kitaab,
        muftiName,
        registrationNumber,
        askerName,
        date,
        showDate,
      };
      if (category) {
        const org = await QuestionCategory.findById(category);
        if (!org) {
          return res.status(400).json({ error: "Invalid category ID" });
        }
        updatedQuestion.category = category;
        updatedQuestion.categorySlug = org.slug;
      }

      // Find and update the question by slug
      const updated = await Question.findOneAndUpdate(
        { slug: req.params.slug },
        updatedQuestion,
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ error: "Question not found" });
      }

      res.json(updated);
    } catch (err) {
      // console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Delete a question
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Question not found" });
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
