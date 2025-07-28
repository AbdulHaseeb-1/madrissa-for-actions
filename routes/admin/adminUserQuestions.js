const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const UserQuestion = require('../../models/UserQuestion');
const nodemailer = require('nodemailer');
const auth = require('../../middleware/auth');
const router = express.Router();

// Middlewares
// router.use(auth);

// Rate limiter to prevent spam
const answerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10,
  message: 'Too many requests. Please try again later.'
});

// GET: List all questions
router.get('/', async (req, res) => {
  try {
    const questions = await UserQuestion.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Mark as answered
router.put('/mark-answered/:id', async (req, res) => {
  try {
    const updated = await UserQuestion.findByIdAndUpdate(
      req.params.id,
      { isAnswered: true },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Delete question
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await UserQuestion.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST: Send answer via email
router.post(
  '/send-answer',
  answerLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    body('questionId').isMongoId(),
    body('answer').notEmpty().escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, answer, questionId } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: `"Admin Team" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: 'Answer to Your Question',
      html: `<p><strong>Answer:</strong><br>${answer}</p>`
    };

    try {
      const mailInfo = await transporter.sendMail(mailOptions);

      const updated = await UserQuestion.findByIdAndUpdate(
        questionId,
        {
          isAnswered: true,
          answeredBy: req.user._id // ✅ Save the admin's ID
        },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ error: 'Question not found.' });
      }

      res.json({ message: 'Email sent and question marked as answered.', info: mailInfo });
    } catch (err) {
      res.status(500).json({ error: 'Failed to send email', details: err.message });
    }
  }
);

module.exports = router;
