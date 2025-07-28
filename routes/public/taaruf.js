const express = require("express");
const Taaruf = require("../../models/Taaruf");
const router = express.Router();

//  Get All Active Taaruf
router.get("/", async (req, res) => {
  try {
    const taarufList = await Taaruf.find({ isActive: true });
    res.json({
      success: true,
      taarufs: taarufList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching Taaruf list",
      error: err.message,
    });
  }
});

// ✅ Get Single Taaruf by ID (only if not removed)
router.get("/details/:slug", async (req, res) => {
  try {
    if (!req.params.slug) {
      return res
        .status(404)
        .json({ success: false, message: "Slug not found" });
    }

    const taaruf = await Taaruf.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!taaruf) {
      return res
        .status(404)
        .json({ success: false, message: "Taaruf not found" });
    }

    res.json({
      success: true,
      data: taaruf,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching Taaruf",
      error: err.message,
    });
  }
});

module.exports = router;
