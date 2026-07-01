# Food Processing ERP System

**Enterprise-grade ERP system engineered with the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS.**

This system is inspired by industry-standard SAP modules (SAP MM and SAP PP) to deliver a comprehensive suite for automating procurement, inventory management, production planning, warehouse operations, and order processing.

## Core Modules

### 1. Materials Management (MM)
- **Vendor & Purchase Orders:** Manage suppliers and generate purchase orders with ease.
- **Goods Receipt (GRN):** Seamlessly process incoming deliveries and update real-time stock levels.
- **Inventory Tracking:** Monitor Current Stock, Reserved Stock, and Available Stock across multiple warehouses with automated Low-Stock Alerts.

### 2. Production Planning (PP)
- **Bill of Materials (BOM):** Define exact raw material requirements for finished goods.
- **Production Orders:** Schedule and execute manufacturing runs.
- **Material Requirement Planning (MRP):** Automated shortage detection that triggers procurement alerts before production starts.

## Technology Stack
- **Frontend:** React, React Router, Tailwind CSS, Recharts (for Analytics)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose (Schemas for Users, Materials, POs, GRN, BOMs, etc.)
- **Security:** JWT Authentication and Role-Based Access Control (RBAC)

## Getting Started

1. Set your MongoDB Atlas URI in `backend/.env`
2. Start Backend: `cd backend && npm start`
3. Start Frontend: `cd frontend && npm run dev`
