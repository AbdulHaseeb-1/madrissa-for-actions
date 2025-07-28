const express = require("express");
const router = express.Router();

const Bayan = require("../../models/Bayan");
const Question = require("../../models/Question");

router.get("/stats", async (req, res) => {
  try {
    const totalQuestions = await Question.countDocuments();
    const totalBayanat = await Bayan.countDocuments();
    const unansweredQuestions = await Question.countDocuments({
      isAnswered: false,
    });

    res.json({
      totalQuestions,
      totalBayanat,
      unansweredQuestions,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
