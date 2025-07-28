const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    question: { type: String, required: true },
    slug: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionCategory" },
    categorySlug: { type: String },
    fatwaTitle: { type: String },
    fatwaNumber: { type: String },
    date: { type: String },
    showDate: { type: String },
    registrationNumber: { type: String, required: true },
    kitaab: { type: String, required: true },
    muftiName: { type: String, required: true },
    askerName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

questionSchema.pre("save", async function (next) {
  if (this.isModified("category")) {
    const category = await mongoose
      .model("QuestionCategory")
      .findById(this.category);
    if (category) {
      this.categorySlug = category.slug;
    }
  }
  next();
});

questionSchema.plugin(require("mongoose-sanitizer-plugin"));

module.exports = mongoose.model("Question", questionSchema);
