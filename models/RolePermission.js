// models/RolePermission.js
const mongoose = require('mongoose');

const rolePermissionSchema = new mongoose.Schema({
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  feature: { type: mongoose.Schema.Types.ObjectId, ref: 'Feature', required: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true }],
}, { timestamps: true });

module.exports = mongoose.model('RolePermission', rolePermissionSchema);
