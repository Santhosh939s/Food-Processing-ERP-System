const mongoose = require('mongoose');

// User & Roles
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Inventory Manager', 'Production Manager', 'Sales Manager', 'Vendor'], default: 'Admin' },
});
const User = mongoose.model('User', userSchema);

// Materials (Raw & Finished)
const materialSchema = new mongoose.Schema({
  materialCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['Raw Material', 'Finished Good'], required: true },
  unit: { type: String, required: true }, // kg, L, pieces
  cost: { type: Number, required: true },
  minStockLevel: { type: Number, default: 0 }
});
const Material = mongoose.model('Material', materialSchema);

// Vendors
const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String },
  email: { type: String }
});
const Vendor = mongoose.model('Vendor', vendorSchema);

// Purchase Order (SAP MM)
const poSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  materials: [{
    material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' },
    quantity: Number,
    price: Number
  }],
  status: { type: String, enum: ['Pending', 'Accepted', 'Received'], default: 'Pending' },
}, { timestamps: true });
const PurchaseOrder = mongoose.model('PurchaseOrder', poSchema);

// Inventory (Warehouse Tracking)
const inventorySchema = new mongoose.Schema({
  material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
  warehouse: { type: String, required: true },
  quantity: { type: Number, default: 0 },
});
const Inventory = mongoose.model('Inventory', inventorySchema);

// Bill of Materials (BOM) (SAP PP)
const bomSchema = new mongoose.Schema({
  finishedProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
  rawMaterials: [{
    material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' },
    quantityRequired: Number
  }]
});
const BOM = mongoose.model('BOM', bomSchema);

// Production Order (SAP PP)
const productionOrderSchema = new mongoose.Schema({
  bom: { type: mongoose.Schema.Types.ObjectId, ref: 'BOM', required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['Scheduled', 'In Progress', 'Completed'], default: 'Scheduled' },
  startDate: Date,
  endDate: Date
});
const ProductionOrder = mongoose.model('ProductionOrder', productionOrderSchema);

module.exports = { User, Material, Vendor, PurchaseOrder, Inventory, BOM, ProductionOrder };
