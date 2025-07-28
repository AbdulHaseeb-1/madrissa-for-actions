const express = require('express');
const router = express.Router();
const Feature = require('../../models/Feature');
const verifyAdmin = require('../../middleware/auth');

// 🔒 List all features
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching features', error: err.message });
  }
});

module.exports = router;
