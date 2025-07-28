const express = require("express");
const router = express.Router();
const RolePermission = require("../../models/RolePermission");
const Permission = require("../../models/Permission");
const verifyAdmin = require("../../middleware/auth");

// 🔒 Assign multiple permissions to a role
router.post("/assign", verifyAdmin, async (req, res) => {
  try {
    const { roleId, assignments } = req.body;
    const inserts = assignments.map((a) => ({
      role: roleId,
      feature: a.featureId,
      permission: a.permissionId,
    }));

    await RolePermission.insertMany(inserts);
    res.status(200).json({ message: "Permissions assigned to role" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error assigning permissions", error: err.message });
  }
});

// Get all roles with features and permissions
router.get("/all", verifyAdmin, async (req, res) => {
  try {
    // console.log("🔍 Fetching all roles with features and permissions");

    const roles = await RolePermission.aggregate([
      // Lookup Role details
      {
        $lookup: {
          from: "roles",
          let: { roleId: "$role" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$_id", "$$roleId"] },
                    { $ne: ["$name", "subadmin"] },
                  ],
                },
              },
            },
          ],
          as: "roleDetails",
        },
      },
      {
        $unwind: "$roleDetails",
      },

      // // Lookup Feature details
      {
        $lookup: {
          from: "features",
          localField: "feature",
          foreignField: "_id",
          as: "featureDetails",
        },
      },
      {
        $unwind: "$featureDetails",
      },

      // // Lookup Permissions (array lookup)
      {
        $lookup: {
          from: "permissions",
          localField: "permissions",
          foreignField: "_id",
          as: "permissionDetails",
        },
      },

      // Group by Role
      {
        $group: {
          _id: "$roleDetails._id",
          roleName: { $first: "$roleDetails.name" },
          features: {
            $push: {
              featureId: "$featureDetails._id",
              featureName: "$featureDetails.name",
              permissions: "$permissionDetails", // full array of permission objects
            },
          },
        },
      },
    ]);

    res.json(roles);
  } catch (err) {
    // console.error("❌ Error in /all:", err);
    res.status(500).json({
      message: "Error fetching roles and permissions",
      error: err.message,
    });
  }
});

// 🔒 List all permissions
router.get("/list", verifyAdmin, async (req, res) => {
  try {
    const perms = await Permission.find();
    res.json(perms);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching permissions", error: err.message });
  }
});

module.exports = router;
