import { useState } from 'react';
import { RefreshCw, ArrowRightLeft } from 'lucide-react';

export default function Inventory() {
  const [items] = useState([
    { id: 'MAT-1001', name: 'Organic Wheat Flour', type: 'Raw Material', currentStock: 5000, reservedStock: 1000, available: 4000, unit: 'kg', min: 2000, warehouse: 'Warehouse A' },
    { id: 'MAT-1002', name: 'Cane Sugar', type: 'Raw Material', currentStock: 10, reservedStock: 0, available: 10, unit: 'kg', min: 25, warehouse: 'Warehouse B' },
    { id: 'MAT-2001', name: 'Chocolate Biscuit', type: 'Finished Good', currentStock: 1500, reservedStock: 500, available: 1000, unit: 'packets', min: 500, warehouse: 'Cold Storage 1' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inventory Management</h1>
          <p className="text-slate-500">Track current stock, reserved stock, and warehouse locations.</p>
        </div>
        <div className="flex gap-3">
           <button className="sap-btn bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300">
             <ArrowRightLeft size={18} /> Transfer Stock
           </button>
           <button className="sap-btn">
             <RefreshCw size={18} /> Sync ERP
           </button>
        </div>
      </div>

      <div className="sap-card p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
           <h2 className="text-lg font-semibold text-slate-800">Material Master / Stock Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="sap-table-th">Material Code</th>
                <th className="sap-table-th">Name</th>
                <th className="sap-table-th">Type</th>
                <th className="sap-table-th text-right">Current Stock</th>
                <th className="sap-table-th text-right">Reserved (PP)</th>
                <th className="sap-table-th text-right">Available</th>
                <th className="sap-table-th">Location</th>
                <th className="sap-table-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
                 const isLow = item.available < item.min;
                 return (
                   <tr key={item.id} className="hover:bg-slate-50">
                     <td className="sap-table-td font-mono">{item.id}</td>
                     <td className="sap-table-td font-medium">{item.name}</td>
                     <td className="sap-table-td">{item.type}</td>
                     <td className="sap-table-td text-right font-semibold">{item.currentStock} {item.unit}</td>
                     <td className="sap-table-td text-right text-slate-500">{item.reservedStock} {item.unit}</td>
                     <td className={`sap-table-td text-right font-bold ${isLow ? 'text-red-600' : 'text-green-600'}`}>
                        {item.available} {item.unit}
                     </td>
                     <td className="sap-table-td">{item.warehouse}</td>
                     <td className="sap-table-td">
                        {isLow ? (
                           <span className="badge badge-danger">Low Stock Alert</span>
                        ) : (
                           <span className="badge badge-success">Sufficient</span>
                        )}
                     </td>
                   </tr>
                 )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
