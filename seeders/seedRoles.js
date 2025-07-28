// seedRoles.js

const mongoose = require("mongoose");

const Role = require("../models/Role.js");

// Load environment variables from .env file
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });


// Async function to seed roles
const seedRoles = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🧹 Cleaning up existing roles...');
    await Role.deleteMany({}); // Optional: Clear previous entries

    console.log('🌱 Seeding roles...');
    await Role.insertMany([
      { name: 'admin', description: 'Full system access' },
      { name: 'subadmin', description: 'Limited permissions assigned by admin' },
    ]);

    console.log('✅ Roles seeded successfully!');
  } catch (err) {
    console.error('❌ Failed to seed roles:', err.message);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    process.exit();
  }
};

seedRoles();
