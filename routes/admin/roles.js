const express = require('express');
const router = express.Router();
const Role = require('../../models/Role');
const verifyAdmin = require('../../middleware/auth');

// 🔒 List all roles
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching roles', error: err.message });
  }
});

module.exports = router;
