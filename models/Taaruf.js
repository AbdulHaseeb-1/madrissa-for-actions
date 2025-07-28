const { default: mongoose } = require("mongoose");

const Taaruf = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String },
    details: { type: String },
    slug: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

Taaruf.plugin(require("mongoose-sanitizer-plugin"));

module.exports = mongoose.model("Taaruf", Taaruf);
