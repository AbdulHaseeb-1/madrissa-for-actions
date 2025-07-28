const express = require("express");
const router = express.Router();
const Bayan = require("../../models/Bayan");
const BayanCategory = require("../../models/BayanCategory");
//  -------

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    const query =
      search.length > 0
        ? {
            $or: [
              { slug: { $regex: search, $options: "i" } },
              { bani: { $regex: search, $options: "i" } },
            ],
          }
        : {};

    const totalQuestions = await Bayan.countDocuments(query);

    const bayans = await Bayan.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit)
      .populate("bani", "name")
      .select("title slug bani date showDate"); // Correct field selection

    res.json({
      bayans,
      currentPage: page,
      totalPages: Math.ceil(totalQuestions / limit),
      totalQuestions,
    });
  } catch (err) {
    // console.error("Error fetching bayans:", err);
    res
      .status(500)
      .json({ error: "سرور میں خرابی، براہ کرم دوبارہ کوشش کریں" });
  }
});

router.get("/details/:bayanSlug", async (req, res) => {
  const { bayanSlug } = req.params;

  try {
    const bayan = await Bayan.findOne({ slug: bayanSlug }).lean(); // Faster, returns plain JS object

    if (!bayan) {
      return res.status(404).json({ message: "  بیان نہیں ملا " });
    }

    const category = await BayanCategory.findById(bayan.category).lean();

    bayan.categoryName = category?.name || "نامعلوم";

    res.json(bayan);
  } catch (err) {
    // console.error(err); // helpful in debugging
    res.status(500).json({ error: err.message });
  }
});

// ✅ Public: Get all bayans by categorySlug
router.get("/:categorySlug", async (req, res) => {
  const categorySlug = req.params.categorySlug;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  const query = categorySlug === "all" ? {} : { categorySlug: categorySlug };
  try {
    const totalBayans = await Bayan.countDocuments(query);
    const bayans = await Bayan.find(query, {
      slug: true,
      title: true,
      date: true,
    })
      .skip(skip)
      .limit(limit);

    return res.json({
      bayans,
      currentPage: page,
      totalPages: Math.ceil(totalBayans / limit),
      totalBayans,
    });
  } catch (err) {
    // console.error("Error fetching bayans:", err);
    res
      .status(500)
      .json({ message: "سرور میں خرابی، براہ کرم دوبارہ کوشش کریں" });
  }
});

module.exports = router;
