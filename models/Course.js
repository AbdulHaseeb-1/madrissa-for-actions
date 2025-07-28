const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  tafseel: { type: String, required: true },
  imagePublicId: { type: String, required: true },
});

module.exports = mongoose.model('Course', courseSchema);
