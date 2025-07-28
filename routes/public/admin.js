const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth"); // ✅ Add middleware import

// POST /api/admin/login
router.post("/login", async (req, res) => {
  const data = req.body; // ✅ Destructure credentials from req.body

  if (!data || !data.credentials) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const username = data.credentials.username;
  const password = data.credentials.password;

  // console.log("🛠 Received login:", { username });

  try {
    const user = await User.findOne({ username }).populate("role");

    if (!user) {
      // console.log("⚠️ Admin not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      // console.log("❌ Incorrect password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      }, // ✅ include username here
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
      maxAge: 60 * 60 * 1000 * 12, // 1 hour
      path: "/",
    });

    res.json({
      message: "Login successful",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user?.phone,
        role: user.role,
      },
    }); // ✅ Include username in response
  } catch (err) {
    // console.error("🚨 Server error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/admin/logout
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
      maxAge: 60 * 60 * 1000 * 12, // 1 hour
      path: "/",
    });
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    // console.error("🚨 Server error during logout:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ UPDATED: GET /api/admin/check-auth (now uses auth middleware)
router.get("/check-auth", auth, (req, res) => {
  res.json({ user: req?.user || "Admin" });
});

module.exports = router;
