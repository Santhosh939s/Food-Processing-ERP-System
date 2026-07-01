import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Truck, Package, Factory, ShoppingCart, Settings } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Procurement from './pages/Procurement';
import Inventory from './pages/Inventory';
import Production from './pages/Production';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-slate-50">
        {/* Sidebar */}
        <nav className="w-64 bg-sapDark text-slate-300 flex flex-col border-r border-slate-800">
          <div className="p-6 text-xl font-bold text-white flex items-center gap-3 border-b border-slate-700">
            <Factory size={28} className="text-blue-400" />
            FoodFlow ERP
          </div>
          <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
            <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">MM (Materials Mgmt)</div>
            <NavLink to="/procurement" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
              <Truck size={20} /> Procurement
            </NavLink>
            <NavLink to="/inventory" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
              <Package size={20} /> Inventory
            </NavLink>
            <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">PP (Production Planning)</div>
            <NavLink to="/production" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
              <Factory size={20} /> Production
            </NavLink>
            <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">SD (Sales & Dist)</div>
            <NavLink to="/sales" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
              <ShoppingCart size={20} /> Sales
            </NavLink>
          </div>
          <div className="p-4 border-t border-slate-700">
             <button className="flex items-center gap-3 px-4 py-3 w-full rounded-md hover:bg-slate-800 transition-colors">
               <Settings size={20} /> Settings
             </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm">
             <h2 className="text-lg font-semibold text-slate-700">Enterprise Dashboard</h2>
             <div className="ml-auto flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">A</div>
                <span className="text-sm font-medium text-slate-600">Admin User</span>
             </div>
          </header>
          <div className="flex-1 overflow-auto p-8 bg-slate-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/procurement" element={<Procurement />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/production" element={<Production />} />
              <Route path="/sales" element={<div className="p-8 text-center text-slate-500">Sales Module Under Construction</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
