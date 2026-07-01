import { useState } from 'react';
import { Play, FileText, AlertCircle } from 'lucide-react';

export default function Production() {
  const [activeTab, setActiveTab] = useState('orders');
  
  const [boms] = useState([
    { id: 'BOM-101', product: 'Chocolate Biscuit', materials: 'Flour (500g), Sugar (200g), Chocolate (150g), Oil (50ml)' },
    { id: 'BOM-102', product: 'Tomato Sauce', materials: 'Tomatoes (1kg), Salt (50g), Sugar (100g)' },
  ]);

  const [orders] = useState([
    { id: 'PROD-7001', product: 'Chocolate Biscuit', quantity: 1000, date: '2026-07-02', status: 'In Progress', mrp: 'Clear' },
    { id: 'PROD-7002', product: 'Tomato Sauce', quantity: 500, date: '2026-07-05', status: 'Scheduled', mrp: 'Shortage' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Production Planning (SAP PP)</h1>
          <p className="text-slate-500">Manage Bill of Materials (BOM) and MRP workflows.</p>
        </div>
        <button className="sap-btn">
          <Play size={18} /> New Production Order
        </button>
      </div>

      <div className="sap-card p-0 overflow-hidden">
         <div className="flex border-b border-slate-200">
            <button 
               onClick={() => setActiveTab('orders')}
               className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'orders' ? 'border-sapBlue text-sapBlue' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
               Production Orders
            </button>
            <button 
               onClick={() => setActiveTab('boms')}
               className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'boms' ? 'border-sapBlue text-sapBlue' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
               Bill of Materials (BOM)
            </button>
         </div>
         
         <div className="p-6 overflow-x-auto">
            {activeTab === 'orders' && (
               <table className="min-w-full">
                 <thead>
                   <tr>
                     <th className="sap-table-th">Order ID</th>
                     <th className="sap-table-th">Target Product (BOM)</th>
                     <th className="sap-table-th text-right">Quantity</th>
                     <th className="sap-table-th">Start Date</th>
                     <th className="sap-table-th">MRP Status</th>
                     <th className="sap-table-th">Status</th>
                     <th className="sap-table-th text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   {orders.map(order => (
                     <tr key={order.id} className="hover:bg-slate-50">
                       <td className="sap-table-td font-mono">{order.id}</td>
                       <td className="sap-table-td font-medium">{order.product}</td>
                       <td className="sap-table-td text-right font-semibold">{order.quantity}</td>
                       <td className="sap-table-td">{order.date}</td>
                       <td className="sap-table-td">
                          {order.mrp === 'Clear' ? (
                             <span className="text-sm font-semibold text-green-600">Materials Available</span>
                          ) : (
                             <span className="text-sm font-semibold text-red-600 flex items-center gap-1">
                                <AlertCircle size={14} /> Shortage (Generate PO)
                             </span>
                          )}
                       </td>
                       <td className="sap-table-td">
                          <span className={`badge ${order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'badge-warning'}`}>
                             {order.status}
                          </span>
                       </td>
                       <td className="sap-table-td text-right">
                         {order.mrp === 'Clear' && order.status === 'Scheduled' ? (
                            <button className="text-sapBlue hover:underline text-sm font-medium">Start Production</button>
                         ) : order.mrp === 'Shortage' ? (
                            <button className="text-amber-600 hover:underline text-sm font-medium">Run MRP</button>
                         ) : (
                            <button className="text-slate-500 text-sm font-medium">Monitor</button>
                         )}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            )}
            
            {activeTab === 'boms' && (
               <table className="min-w-full">
                 <thead>
                   <tr>
                     <th className="sap-table-th">BOM ID</th>
                     <th className="sap-table-th">Finished Product</th>
                     <th className="sap-table-th">Raw Materials Composition</th>
                     <th className="sap-table-th text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {boms.map(bom => (
                     <tr key={bom.id} className="hover:bg-slate-50">
                       <td className="sap-table-td font-mono">{bom.id}</td>
                       <td className="sap-table-td font-semibold">{bom.product}</td>
                       <td className="sap-table-td text-slate-600">{bom.materials}</td>
                       <td className="sap-table-td text-right">
                         <button className="text-sapBlue hover:underline text-sm font-medium inline-flex items-center gap-1">
                            <FileText size={14} /> View/Edit
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            )}
         </div>
      </div>
    </div>
  );
}
