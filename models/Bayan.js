const mongoose = require("mongoose");
const Bani = require("./Bani");

const bayanSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tafseel: { type: String, required: true },
    date: { type: Date, required: true },
    bani: { type: String },
    slug: { type: String, require: true },
    showDate: { type: Boolean, default: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BayanCategory",
    },
    categorySlug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

bayanSchema.pre("save", async function (next) {
  if (this.isModified("category")) {
    const category = await mongoose
      .model("BayanCategory")
      .findById(this.category);
    if (category) {
      this.categorySlug = category.slug;
    }
  }
  next();
});

bayanSchema.plugin(require("mongoose-sanitizer-plugin"));

module.exports = mongoose.model("Bayan", bayanSchema);
