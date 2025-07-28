const express = require("express");
const { z } = require("zod");
const { taarufValidator } = require("../../middleware/validateRequest");
const Taaruf = require("../../models/Taaruf");
const verifyAdmin = require("../../middleware/auth");

const router = express.Router();

// 🛡 Zod Schema for Validation
const taarufSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().min(1, "SubTitle is required"),
  details: z.string().min(1, "Details is required"),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and use hyphens only"
    ),
});

// Add new Taaruf (with slug uniqueness check)
router.post(
  "/add",
  verifyAdmin,
  taarufValidator(taarufSchema),
  async (req, res) => {
    try {
      const existingTaaruf = await Taaruf.findOne({ slug: req.body.slug });

      if (existingTaaruf) {
        return res.status(400).json({
          success: false,
          message: "A Taaruf with this slug already exists.",
        });
      }

      const newTaaruf = new Taaruf(req.body);
      await newTaaruf.save();

      res.status(201).json({
        success: true,
        message: "Taaruf added successfully",
        data: newTaaruf,
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

// ✅ Update Taaruf (Only allowed fields)
router.put("/:id", verifyAdmin, async (req, res) => {
  const { _id, isActive, title, subTitle, details, slug } = req.body;

  try {
    if (!isActive || !title || !subTitle || !details || !slug) {
      return res.status(400).json({ success: false });
    }

    const updatedTaaruf = await Taaruf.findByIdAndUpdate(req.params.id, {
      isActive: isActive == "true" ? true : false,
      title,
      subTitle,
      details,
      slug,
    });

    if (!updatedTaaruf) {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong" });
    }

    res.json({
      success: true,
      message: "Taaruf updated successfully",
      data: updatedTaaruf,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating Taaruf",
      error: err.message,
    });
  }
});

// ✅ Soft Delete Taaruf
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deletedTaaruf = await Taaruf.findByIdAndDelete(req.params.id);

    // if (!deletedTaaruf) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Taaruf not found" });
    // }

    res.json({
      success: true,
      message: "Taaruf deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting Taaruf",
      error: err.message,
    });
  }
});

// ✅ Get All Active Taaruf
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const taarufList = await Taaruf.find();
    res.json({
      success: true,
      data: taarufList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching Taaruf list",
      error: err.message,
    });
  }
});

// ✅ Get Single Taaruf by ID
router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const taaruf = await Taaruf.findOne({
      slug: req.params.id,
    });

    if (!taaruf) {
      return res
        .status(404)
        .json({ success: false, message: "Taaruf not found" });
    }

    res.json({
      success: true,
      data: taaruf,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching Taaruf",
      error: err.message,
    });
  }
});

module.exports = router;
