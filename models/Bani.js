const { default: mongoose } = require("mongoose");

const Bani = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    description: { type: String, required: true },
    about: { type: String },
    email: { type: String },
    phone: { type: String },
    slug: { type: String },
    isRemoved: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

Bani.plugin(require("mongoose-sanitizer-plugin"));

module.exports = mongoose.model("Bani ", Bani);
