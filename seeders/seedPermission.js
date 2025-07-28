require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require('mongoose');
const Permission = require('../models/Permission');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const perms = ['create', 'read', 'update', 'delete'];
  for (const name of perms) {
    await Permission.updateOne({ name }, { name }, { upsert: true });
  }
  console.log('[Permissions] Seeded.');
  process.exit();
})();
