const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Question = require("../models/Question");
const QuestionCategory = require("../models/QuestionCategory"); // Adjust path as needed

// MongoDB connection (adjust URI as per your setup)
const mongoURI =
  "mongodb+srv://user_600:ah111201@cluster0.geihitn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Sample categories to ensure we have some categories to reference
const sampleCategories = [
  { name: "عبادات", slug: "ibadat" },
  { name: "معاملات", slug: "muamalat" },
  { name: "اخلاقیات", slug: "akhlaqiyat" },
  { name: "عقائد", slug: "aqaed" },
];

// Function to generate a single question
const generateQuestion = (categories) => {
  const category = faker.helpers.arrayElement(categories); // Randomly select a category
  return {
    question: faker.lorem.sentence({ min: 5, max: 10 }) + "؟", // Append "?" for Urdu questions
    slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
    answer: faker.lorem.paragraphs(2),
    category: category._id, // Reference category ObjectId
    fatwaTitle: faker.lorem.sentence({ min: 4, max: 8 }),
    fatwaNumber: `F${faker.number.int({ min: 1000, max: 9999 })}`, // e.g., F1234
    categorySlug: category.slug,
  };
};

// Main seeder function
const seedQuestions = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing questions (optional, comment out if you want to keep existing data)
    await Question.deleteMany({});
    console.log("Cleared existing questions");

    // Check if categories exist, create if not
    let categories = await QuestionCategory.find({});
    if (categories.length === 0) {
      console.log("No categories found, creating sample categories...");
      await QuestionCategory.insertMany(sampleCategories);
      categories = await QuestionCategory.find({});
      console.log("Created sample categories");
    }

    // Generate 100 questions
    const questions = Array.from({ length: 100 }, () =>
      generateQuestion(categories)
    );

    // Insert questions into the database
    await Question.insertMany(questions);
    console.log("Seeded 100 questions successfully");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error seeding questions:", err);
    process.exit(1);
  }
};

// Run the seeder
seedQuestions();
