// models/RolePermission.js
const mongoose = require("mongoose");

const SliderImagesSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
  },
  { timestamps: true, length: 4 }
);

SliderImagesSchema.plugin(require("mongoose-sanitizer-plugin"));
module.exports = mongoose.model("SliderImages", SliderImagesSchema);
