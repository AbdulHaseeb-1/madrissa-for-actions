const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const verifyAdmin = require("../../middleware/auth");

// Add a new user (admin or subadmin)
router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { name, username, password, contact, email, roleId } = req.body;

    const existing = await User.findOne({ username });
    if (existing)
      return res.status(409).json({ message: "Username already exists" });

    const exsistingEmail = await User.findOne({ email });
    if (exsistingEmail)
      return res.status(409).json({ message: "Email already exists" });

    const newUser = new User({
      name,
      username,
      password,
      email,
      contact,
      role: roleId,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser._id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

// Get Users
router.get("/", verifyAdmin, async (req, res) => {
  try {
    if (req.user.role.name !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    // Fetch all users except the password field
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    // console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
});

//  Delete user
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    // console.error(err);
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
});

//  Update user
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const { name, username, contact, email, roleId, password } = req.body;
    const userId = req.params.id;

    // Check for duplicate username/email excluding current user
    const existing = await User.findOne({ username, _id: { $ne: userId } });
    if (existing)
      return res.status(409).json({ message: "Username already exists" });

    const existingEmail = await User.findOne({ email, _id: { $ne: userId } });
    if (existingEmail)
      return res.status(409).json({ message: "Email already exists" });

    // Construct update object
    const toUpdate = {
      name,
      username,
      contact,
      email,
      role: roleId,
    };
    if (password) {
      toUpdate["password"] = password;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, toUpdate, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (err) {
    // console.error(err);
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
});

module.exports = router;
