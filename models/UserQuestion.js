const mongoose = require("mongoose");
const sanitizerPlugin = require("mongoose-sanitizer-plugin");

const userQuestionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  contact: { type: String, trim: true },
  message: { type: String, required: true, trim: true },
  answeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null, // ✅ optional at first
  },
  isAnswered: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userQuestionSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model("UserQuestion", userQuestionSchema);
