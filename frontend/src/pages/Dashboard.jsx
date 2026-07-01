import { useState, useEffect } from 'react';
import { Package, Truck, Factory, FileClock, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000, production: 2400 },
  { name: 'Tue', revenue: 3000, production: 1398 },
  { name: 'Wed', revenue: 2000, production: 9800 },
  { name: 'Thu', revenue: 2780, production: 3908 },
  { name: 'Fri', revenue: 1890, production: 4800 },
  { name: 'Sat', revenue: 2390, production: 3800 },
  { name: 'Sun', revenue: 3490, production: 4300 },
];

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ totalMaterials: 0, totalVendors: 0, activeProduction: 0, pendingPOs: 0 });

  useEffect(() => {
    // Mock Data
    setMetrics({ totalMaterials: 15, totalVendors: 8, activeProduction: 3, pendingPOs: 5 });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500">Enterprise overview of MM and PP modules.</p>
        </div>
        <button className="sap-btn">
           <TrendingUp size={18} /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="sap-card flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span>Material Master</span>
            <Package size={20} className="text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-slate-800">{metrics.totalMaterials}</div>
          <span className="text-xs text-green-600 font-semibold">+2 this week</span>
        </div>
        
        <div className="sap-card flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span>Active Vendors</span>
            <Truck size={20} className="text-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-slate-800">{metrics.totalVendors}</div>
        </div>

        <div className="sap-card flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span>Pending POs (GRN)</span>
            <FileClock size={20} className="text-amber-500" />
          </div>
          <div className="text-3xl font-bold text-slate-800">{metrics.pendingPOs}</div>
          <span className="text-xs text-amber-600 font-semibold">Action Required</span>
        </div>

        <div className="sap-card flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span>Production Orders</span>
            <Factory size={20} className="text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-slate-800">{metrics.activeProduction}</div>
          <span className="text-xs text-blue-600 font-semibold">MRP Active</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="sap-card lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Production vs Revenue</h2>
            <div className="h-72">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
                     <YAxis axisLine={false} tickLine={false} />
                     <Tooltip cursor={{fill: '#f8fafc'}} />
                     <Bar dataKey="revenue" fill="#005f9e" radius={[4,4,0,0]} />
                     <Bar dataKey="production" fill="#3b82f6" radius={[4,4,0,0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
         
         <div className="sap-card flex flex-col">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">System Alerts</h2>
            <div className="flex-1 space-y-4">
               <div className="p-4 rounded-md bg-red-50 border border-red-100 flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0"></div>
                  <div>
                     <p className="text-sm font-semibold text-red-800">Low Stock Alert: Sugar</p>
                     <p className="text-xs text-red-600 mt-1">Current: 10kg (Min: 25kg). Triggering MRP.</p>
                  </div>
               </div>
               <div className="p-4 rounded-md bg-amber-50 border border-amber-100 flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 shrink-0"></div>
                  <div>
                     <p className="text-sm font-semibold text-amber-800">GRN Pending: PO-102</p>
                     <p className="text-xs text-amber-600 mt-1">Vendor ABC Foods delivery arrived at Warehouse A.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
