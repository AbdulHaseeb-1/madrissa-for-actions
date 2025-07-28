const express = require("express");
const router = express.Router();
const Question = require("../../models/Question");
const QuestionCategory = require("../../models/QuestionCategory");

// Public: Get all questions with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 30; // Default to 30 questions per page
    const search = req.query.search || ""; // Get search term, default to empty string
    const skip = (page - 1) * limit;

    // Build query for search
    const query = search
      ? {
          $or: [
            { slug: { $regex: search, $options: "i" } },
            { fatwaNumber: { $regex: search, $options: "i" } },
            { registrationNumber: { $regex: search, $options: "i" } },
            { muftiName: { $regex: search, $options: "i" } },
            { kitaab: { $regex: search, $options: "i" } },
            { date: { $regex: search, $options: "i" } },
            { categorySlug: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Count total questions matching the query
    const totalQuestions = await Question.countDocuments(query);

    // Fetch paginated questions
    const questions = await Question.find(query)
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .select(
        "   fatwaNumber registrationNumber muftiName date showDate  title kitaab slug"
      )
      .populate("category"); // Optimize by selecting only needed fields

    res.json({
      questions,
      currentPage: page,
      totalPages: Math.ceil(totalQuestions / limit),
      totalQuestions,
    });
  } catch (err) {
    // console.error("Error fetching questions:", err);
    res
      .status(500)
      .json({ error: "سرور میں خرابی، براہ کرم دوبارہ کوشش کریں" });
  }
});

// Public: Get question details by slug
router.get("/details/:questionSlug", async (req, res) => {
  const { questionSlug } = req.params;
  try {
    const question = await Question.findOne({ slug: questionSlug }).lean(); // Faster, returns plain JS object

    if (!question) {
      return res.status(404).json({ message: "سوال نہیں ملا" });
    }

    const category = await QuestionCategory.findById(question.category).lean();

    question.categoryName = category?.name || "نامعلوم";

    res.json(question);
  } catch (err) {
    // console.error(err); // helpful in debugging
    res.status(500).json({ error: err.message });
  }
});

// Public: Get questions by categorySlug with pagination
router.get("/:search", async (req, res) => {
  const { search } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  try {
    const query =
      search === "all"
        ? {}
        : {
            $or: [
              { fatwaNumber: { $regex: search, $options: "i" } },
              { categorySlug: { $regex: search, $options: "i" } },
            ],
          };

    const totalQuestions = await Question.countDocuments(query);
    const questions = await Question.find(query, {
      slug: 1,
      question: 1,
      title: 1,
    })
      .skip(skip)
      .limit(limit);

    return res.json({
      questions,
      currentPage: page,
      totalPages: Math.ceil(totalQuestions / limit),
      totalQuestions,
    });
  } catch (err) {
    // console.error("Error fetching questions:", err);
    return res.status(500).json({
      message: "سرور میں خرابی، براہ کرم دوبارہ کوشش کریں",
    });
  }
});

router.get("/related/:categorySlug", async (req, res) => {
  const { categorySlug } = req.params;

  try {
    const randomQuestions = await Question.aggregate([
      {
        $match: { categorySlug: categorySlug },
      },
      { $sample: { size: 5 } },
      {
        $project: {
          _id: 1,
          title: 1,
          slug: 1,
        },
      },
    ]);

    // Check if no questions were found
    if (randomQuestions.length === 0) {
      return res.status(404).json({ message: "سوال نہیں ملا" });
    }

    res.json(randomQuestions);
  } catch (err) {
    // console.error("Error fetching related questions:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
