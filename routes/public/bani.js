const express = require("express");
const Bani = require("../../models/Bani");
const router = express.Router();

//  Get All Active Bani
router.get("/", async (req, res) => {
  try {
    const baniList = await Bani.find({ isActive: true });

    res.json({
      success: true,
      banis: baniList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching Bani list",
      error: err.message,
    });
  }
});

// ✅ Get Single Bani by ID (only if not removed)
router.get("/details/:slug", async (req, res) => {
  try {
    if (!req.params.slug) {
      return res
        .status(404)
        .json({ success: false, message: "Slug not found" });
    }

    const bani = await Bani.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!bani) {
      return res
        .status(404)
        .json({ success: false, message: "Bani not found" });
    }

    res.json({
      success: true,
      data: bani,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching Bani",
      error: err.message,
    });
  }
});

module.exports = router;
