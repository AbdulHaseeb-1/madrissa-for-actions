// seedRolePermissions.js
const mongoose = require("mongoose");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });


const Role = require("../models/Role");
const Feature = require("../models/Feature");
const Permission = require("../models/Permission");
const RolePermission = require("../models/RolePermission");

async function seedRolePermissions() {
  console.log("🔁 Seeding Role Permissions...");

  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to DB");

  // Fetch roles, features, and permissions
  const [adminRole] = await Role.find({ name: "admin" });
  const features = await Feature.find({});
  const permissions = await Permission.find({}); // Assuming these are like: view, create, update, delete

  if (!adminRole || !features.length || !permissions.length) {
    throw new Error("Missing roles/features/permissions. Make sure they are seeded first.");
  }

  // Create RolePermission records
  const rolePermissionDocs = features.map((feature) => ({
    role: adminRole._id,
    feature: feature._id,
    permissions: permissions.map(p => p._id), // Assign all permissions
  }));

  // Optional: Clear existing
  await RolePermission.deleteMany({});
  await RolePermission.insertMany(rolePermissionDocs);

  console.log("✅ RolePermissions seeded successfully");
}

(async () => {
  try {
    await seedRolePermissions();
  } catch (err) {
    console.error("❌ Error seeding RolePermissions:", err.message);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
})();
