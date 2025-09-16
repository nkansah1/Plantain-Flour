import React from 'react';
import { 
  DollarSign, 
  BarChart3, 
  Building, 
  Truck, 
  TrendingUp,
  Shield,
  CheckCircle,
  Target,
  GitBranch,
  Home
} from 'lucide-react';

const Sidebar = ({ activeModule, setActiveModule }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: Home },
    { id: 'investment', label: 'Investment Planning', icon: DollarSign, number: 1 },
    { id: 'business-analysis', label: 'Business Case Analysis', icon: BarChart3, number: 2 },
    { id: 'factory-layout', label: 'Factory Layout Design', icon: Building, number: 3 },
    { id: 'supplier-management', label: 'Supplier Management', icon: Truck, number: 4 },
    { id: 'progress-tracking', label: 'Progress Tracking', icon: TrendingUp, number: 5 },
    { id: 'risk-assessment', label: 'Risk Assessment', icon: Shield, number: 6 },
    { id: 'quality-control', label: 'Quality Control', icon: CheckCircle, number: 7 },
    { id: 'market-analysis', label: 'Market Analysis', icon: Target, number: 8 },
    { id: 'system-flowchart', label: 'System Flowchart', icon: GitBranch, number: 9 },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.number && (
                    <span className={`flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full ${
                      isActive ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {item.number}
                    </span>
                  )}
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;