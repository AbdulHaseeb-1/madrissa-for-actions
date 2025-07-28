// seedRoles.js
const mongoose = require("mongoose");
const Features = require("../models/Feature");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

async function seedFeatures() {
  console.log("Seeding features...");
  console.log("Connecting to DB");

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB");

  await Features.insertMany([
    { name: "categories" },
    { name: "questions" },
    { name: "userQuestions" },
    { name: "adminSlider" },
    { name: "bayanat" },
    { name: "courses" },
  ]);

  console.log("✅ Features seeded");
}

// 👇 Wrap it in an IIFE so async/await works
(async () => {
  try {
    await seedFeatures();
  } catch (err) {
    console.error("❌ Error seeding features:", err);
  } finally {
    mongoose.disconnect();
    process.exit();
  }
})();
