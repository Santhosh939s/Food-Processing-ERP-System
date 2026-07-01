import { useState } from 'react';
import { Plus, Check, Download, AlertCircle } from 'lucide-react';

export default function Procurement() {
  const [activeTab, setActiveTab] = useState('vendors');
  const [vendors] = useState([
    { id: 'V-100', name: 'AgriFoods Inc.', contact: 'John Doe', rating: 'A', status: 'Active' },
    { id: 'V-101', name: 'Global Spice Co.', contact: 'Jane Smith', rating: 'B+', status: 'Active' },
  ]);
  
  const [pos] = useState([
    { id: 'PO-5001', vendor: 'AgriFoods Inc.', amount: '$4,500', date: '2026-07-01', status: 'Pending' },
    { id: 'PO-5002', vendor: 'Global Spice Co.', amount: '$1,200', date: '2026-06-28', status: 'Received' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Procurement (SAP MM)</h1>
          <p className="text-slate-500">Manage vendors, purchase orders, and GRN.</p>
        </div>
        <button className="sap-btn">
          <Plus size={18} /> Create PO
        </button>
      </div>

      <div className="sap-card p-0 overflow-hidden">
         <div className="flex border-b border-slate-200">
            <button 
               onClick={() => setActiveTab('vendors')}
               className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'vendors' ? 'border-sapBlue text-sapBlue' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
               Vendor Management
            </button>
            <button 
               onClick={() => setActiveTab('pos')}
               className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'pos' ? 'border-sapBlue text-sapBlue' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
               Purchase Orders
            </button>
         </div>
         
         <div className="p-6 overflow-x-auto">
            {activeTab === 'vendors' && (
               <table className="min-w-full">
                 <thead>
                   <tr>
                     <th className="sap-table-th">Vendor ID</th>
                     <th className="sap-table-th">Vendor Name</th>
                     <th className="sap-table-th">Contact</th>
                     <th className="sap-table-th">Rating</th>
                     <th className="sap-table-th">Status</th>
                     <th className="sap-table-th text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {vendors.map(v => (
                     <tr key={v.id} className="hover:bg-slate-50">
                       <td className="sap-table-td font-mono">{v.id}</td>
                       <td className="sap-table-td font-medium">{v.name}</td>
                       <td className="sap-table-td">{v.contact}</td>
                       <td className="sap-table-td">{v.rating}</td>
                       <td className="sap-table-td"><span className="badge badge-success">{v.status}</span></td>
                       <td className="sap-table-td text-right">
                         <button className="text-sapBlue hover:underline text-sm font-medium">Edit</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            )}
            
            {activeTab === 'pos' && (
               <table className="min-w-full">
                 <thead>
                   <tr>
                     <th className="sap-table-th">PO Number</th>
                     <th className="sap-table-th">Vendor</th>
                     <th className="sap-table-th">Amount</th>
                     <th className="sap-table-th">Date</th>
                     <th className="sap-table-th">Status</th>
                     <th className="sap-table-th text-right">GRN Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   {pos.map(po => (
                     <tr key={po.id} className="hover:bg-slate-50">
                       <td className="sap-table-td font-mono">{po.id}</td>
                       <td className="sap-table-td">{po.vendor}</td>
                       <td className="sap-table-td font-semibold">{po.amount}</td>
                       <td className="sap-table-td">{po.date}</td>
                       <td className="sap-table-td">
                          <span className={`badge ${po.status === 'Received' ? 'badge-success' : 'badge-warning'}`}>
                             {po.status}
                          </span>
                       </td>
                       <td className="sap-table-td text-right">
                         {po.status === 'Pending' ? (
                            <button className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm font-medium">
                               <AlertCircle size={14} /> Process GRN
                            </button>
                         ) : (
                            <button className="inline-flex items-center gap-1 text-slate-400 cursor-not-allowed text-sm font-medium">
                               <Check size={14} /> Received
                            </button>
                         )}
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
