const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const UserQuestion = require('../../models/UserQuestion');

// POST /api/user-questions/add
router.post(
  '/add',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters').escape(),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('contact').matches(/^03\d{9}$/).withMessage('Contact must be a valid Pakistani number (e.g., 03xxxxxxxxx)').optional(),
    body('message').trim().isLength({ min: 5 }).withMessage('Message must be at least 5 characters').escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, contact, message } = req.body;

    try {
      const newQuestion = new UserQuestion({
        name,
        email,
        contact,
        message
      });

      await newQuestion.save();
      res.status(201).json({ message: 'Question submitted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
