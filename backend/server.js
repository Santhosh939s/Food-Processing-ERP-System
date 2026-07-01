require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Material, Vendor, PurchaseOrder, Inventory, BOM, ProductionOrder } = require('./models/schemas');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secret-erp-key';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error(err));

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// --- AUTH ROUTES ---
app.post('/api/auth/login', async (req, res) => {
  // Mock login for demo purposes
  const { email, password } = req.body;
  if (email === 'admin@foodflow.com' && password === 'admin') {
    const token = jwt.sign({ id: 'admin123', role: 'Admin' }, JWT_SECRET);
    return res.json({ token, role: 'Admin' });
  }
  res.status(400).json({ error: 'Invalid credentials' });
});

// --- DASHBOARD (KPIs) ---
app.get('/api/dashboard', async (req, res) => {
  try {
    const totalMaterials = await Material.countDocuments();
    const totalVendors = await Vendor.countDocuments();
    const pendingPOs = await PurchaseOrder.countDocuments({ status: 'Pending' });
    const activeProduction = await ProductionOrder.countDocuments({ status: { $in: ['Scheduled', 'In Progress'] } });
    res.json({ totalMaterials, totalVendors, pendingPOs, activeProduction });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- SAP MM: MATERIALS & INVENTORY ---
app.get('/api/materials', async (req, res) => {
  const materials = await Material.find();
  res.json(materials);
});
app.post('/api/materials', async (req, res) => {
  const m = new Material(req.body);
  await m.save();
  res.status(201).json(m);
});

app.get('/api/inventory', async (req, res) => {
  const inv = await Inventory.find().populate('material');
  res.json(inv);
});
app.post('/api/inventory', async (req, res) => {
  // In SAP MM, this happens via GRN (Goods Receipt), but we provide direct insert for demo
  const inv = new Inventory(req.body);
  await inv.save();
  res.status(201).json(inv);
});

// --- SAP MM: PROCUREMENT (Vendors & POs) ---
app.get('/api/vendors', async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
});
app.post('/api/vendors', async (req, res) => {
  const v = new Vendor(req.body);
  await v.save();
  res.status(201).json(v);
});

app.get('/api/procurement/orders', async (req, res) => {
  const pos = await PurchaseOrder.find().populate('vendor').populate('materials.material');
  res.json(pos);
});
app.post('/api/procurement/orders', async (req, res) => {
  const po = new PurchaseOrder(req.body);
  await po.save();
  res.status(201).json(po);
});

// --- SAP PP: PRODUCTION (BOM & Orders) ---
app.get('/api/production/bom', async (req, res) => {
  const boms = await BOM.find().populate('finishedProduct').populate('rawMaterials.material');
  res.json(boms);
});
app.post('/api/production/bom', async (req, res) => {
  const bom = new BOM(req.body);
  await bom.save();
  res.status(201).json(bom);
});

app.get('/api/production/orders', async (req, res) => {
  const pos = await ProductionOrder.find().populate('bom');
  res.json(pos);
});
app.post('/api/production/orders', async (req, res) => {
  const po = new ProductionOrder(req.body);
  await po.save();
  res.status(201).json(po);
});

// --- SERVE FRONTEND (For Production/Render) ---
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
