const express = require("express");
const { z } = require("zod");
const { baniValidator } = require("../../middleware/validateRequest");
const Bani = require("../../models/Bani");
const verifyAdmin = require("../../middleware/auth");

const router = express.Router();

// 🛡 Zod Schema for Validation
const baniSchema = z.object({
  name: z.string().min(1, "Name is required"),
  specialization: z.string().min(1, "Specialization is required"),
  description: z.string().min(1, "Description is required"),
  about: z.string().min(1, "About is required"),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and use hyphens only"
    ),
});

// Add new Bani (with slug uniqueness check)
router.post(
  "/add",
  verifyAdmin,
  baniValidator(baniSchema),
  async (req, res) => {
    try {
      const existingBani = await Bani.findOne({ slug: req.body.slug });

      if (existingBani) {
        return res.status(400).json({
          success: false,
          message: "A Bani with this slug already exists.",
        });
      }

      const newBani = new Bani(req.body);
      await newBani.save();

      res.status(201).json({
        success: true,
        message: "Bani added successfully",
        data: newBani,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  }
);

// // ✅ Update Bani (Only allowed fields)
router.put("/:id", verifyAdmin, async (req, res) => {
  const { isActive } = req.body;

  try {
    if (isActive == undefined) {
      return res.status(400).json({ success: false });
    }

    const updatedBani = await Bani.findByIdAndUpdate(req.params.id, {
      isActive: isActive,
    });

    if (!updatedBani) {
      return res
        .status(404)
        .json({ success: false, message: "Bani not found" });
    }

    res.json({
      success: true,
      message: "Bani updated successfully",
      data: updatedBani,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating Bani",
      error: err.message,
    });
  }
});

// ✅ Soft Delete Bani
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deletedBani = await Bani.findByIdAndDelete(req.params.id);

    // if (!deletedBani) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Bani not found" });
    // }

    res.json({
      success: true,
      message: "Bani deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting Bani",
      error: err.message,
    });
  }
});

// ✅ Get All Active Bani
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const baniList = await Bani.find({ isRemoved: { $ne: true } });
    res.json({
      success: true,
      data: baniList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching Bani list",
      error: err.message,
    });
  }
});

// ✅ Get Single Bani by ID (only if not removed)
router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const bani = await Bani.findOne({
      _id: req.params.id,
      isRemoved: { $ne: true },
    });

    if (!bani) {
      return res
        .status(404)
        .json({ success: false, message: "Bani not found" });
    }

    res.json({
      success: true,
      data: bani,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching Bani",
      error: err.message,
    });
  }
});

module.exports = router;
