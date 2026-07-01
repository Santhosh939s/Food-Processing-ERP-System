const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  items: [{
    materialName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Received', 'Cancelled'], default: 'Pending' },
  expectedDelivery: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
