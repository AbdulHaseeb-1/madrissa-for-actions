const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., bayans, courses
});

module.exports = mongoose.model('Feature', featureSchema);
