require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const Bayan = require("../models/Bayan");
const BayanCategory = require("../models/BayanCategory"); // assuming it's in models
const Bani = require("../models/Bani"); // assuming you might want to use it

const mongoURI =
  "mongodb+srv://user_600:ah111201@cluster0.geihitn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedBayan() {
  try {
    await mongoose.connection.dropCollection("bayans").catch(() => {});
    const categories = await BayanCategory.find();

    if (categories.length === 0) {
      console.log("❌ No Bayan categories found. Please seed BayanCategory first.");
      return;
    }

    const bayans = [];

    for (let i = 0; i < 100; i++) {
      const randomCategory = faker.helpers.arrayElement(categories);

      const bayan = new Bayan({
        title: faker.lorem.sentence(),
        tafseel: faker.lorem.paragraphs(3),
        date: faker.date.past(),
        bani: faker.person.fullName(),
        slug: faker.helpers.slugify(faker.lorem.words(3).toLowerCase()),
        category: randomCategory._id,
      });

      bayans.push(bayan.save()); // save() will trigger pre-save hook for categorySlug
    }

    await Promise.all(bayans);
    console.log("✅ 100 Bayans seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding bayans:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedBayan();
