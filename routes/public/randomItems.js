const express = require("express");
const router = express.Router();
const Question = require("../../models/Question");
const QuestionCategory = require("../../models/QuestionCategory");

// @route   GET /api/questions/by-random-categories
// @desc    Get 6 random categories and 3 questions from each
// @access  Public

router.get("/question-by-random-categories", async (req, res) => {
  try {
    // Step 1: Get 6 random categories
    const randomCategories = await QuestionCategory.aggregate([
      { $sample: { size: 6 } },
    ]);

    if (!randomCategories.length) {
      return res
        .status(400)
        .json({ success: false, message: "No categories found" });
    }

    // Step 2: For each category, get 3 latest questions
    const groupedResults = await Promise.all(
      randomCategories.map(async (category) => {
        const questions = await Question.find({ category: category._id })
          .limit(3)
          .sort({ createdAt: -1 })
          .select("title slug fatwaTitle");

        return {
          category: {
            _id: category._id,
            name: category.name,
            slug: category.slug,
          },
          questions,
        };
      })
    );

    // Step 3: Filter out empty categories
    const nonEmptyGroups = groupedResults.filter(
      (group) => group.questions.length > 0
    );

    if (!nonEmptyGroups.length) {
      return res.status(404).json({
        success: false,
        message: "No questions found in the selected categories",
      });
    }

    // Step 4: Return the grouped questions
    res.status(200).json({
      success: true,
      data: nonEmptyGroups,
    });
  } catch (error) {
    // console.error("[ERROR] /api/questions/by-random-categories", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
