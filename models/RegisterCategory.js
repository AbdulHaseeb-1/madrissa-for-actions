const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // description: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    slug: { type: String, require: true, dropDups: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RegisterCategory", categorySchema);
