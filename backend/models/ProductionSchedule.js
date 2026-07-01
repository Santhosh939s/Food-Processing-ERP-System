const mongoose = require('mongoose');

const productionScheduleSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantityPlanned: { type: Number, required: true },
  quantityProduced: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Scheduled', 'In Progress', 'Completed', 'On Hold'], default: 'Scheduled' },
  materialsUsed: [{
    material: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
    quantity: { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('ProductionSchedule', productionScheduleSchema);
