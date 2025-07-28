const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const Role = require("../models/Role"); // adjust path if needed

// Use the MONGO_URI from the .env file
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function createAdmin() {
  const name = "rasheed";
  const username = "rasheed";
  const password = "Rasheed.0090";
  const email = "email@gmail.com";
  const phone = "03123457890";

  const role = await Role.findOne({ name: "admin" });
  if (!role) throw new Error("Admin role not found");

  const existingAdmin = await User.findOne({ username });
  if (!existingAdmin) {
    const user = new User({
      name,
      username,
      password,
      email,
      phone,
      role,
    });
    await user.save();
    console.log("User created");
  } else {
    console.log("User already exists");
  }

  mongoose.disconnect();
}

createAdmin();
