const express = require("express");
const Slider = require("../../models/Slider");
const router = express.Router();

router.get("/images", async (req, res) => {
  try {
    const slides = await Slider.find();
    res.status(200).json(slides);
  } catch (error) {
    console.log(error.toString());
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
