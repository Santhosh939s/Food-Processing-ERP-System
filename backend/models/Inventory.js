const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemType: { type: String, enum: ['Raw Material', 'Finished Good'], required: true },
  quantity: { type: Number, required: true, default: 0 },
  unit: { type: String, required: true },
  minimumStockLevel: { type: Number, required: true },
  location: { type: String, required: true },
  lastRestocked: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
