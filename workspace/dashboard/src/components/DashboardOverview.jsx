import React from 'react';
import { 
  DollarSign, 
  BarChart3, 
  Building, 
  Truck, 
  TrendingUp,
  GitBranch,
  Shield,
  CheckCircle,
  Target,
  User,
  Calendar,
  Award
} from 'lucide-react';

const DashboardOverview = ({ userData }) => {
  const modules = [
    { 
      id: 1, 
      title: 'Investment Planning', 
      icon: DollarSign, 
      description: 'Investment Planning and Analysis - Available Capital, Land Requirements, Location Planning',
      color: 'bg-blue-500',
      status: 'Not Started'
    },
    { 
      id: 2, 
      title: 'Business Case Analysis', 
      icon: BarChart3, 
      description: 'Complete Financial Analysis - Processing Capacity, Selling Price, Currency Factors',
      color: 'bg-green-500',
      status: 'Not Started'
    },
    { 
      id: 3, 
      title: 'Factory Layout Design', 
      icon: Building, 
      description: 'Automated Facility Planning and Layout Optimization',
      color: 'bg-purple-500',
      status: 'Not Started'
    },
    { 
      id: 4, 
      title: 'Supplier Management', 
      icon: Truck, 
      description: 'Supply Chain Optimization and Raw Material Scarcity Management',
      color: 'bg-orange-500',
      status: 'Not Started'
    },
    { 
      id: 5, 
      title: 'Progress Tracking', 
      icon: TrendingUp, 
      description: 'Quarterly Turnover Analysis and Performance Monitoring',
      color: 'bg-red-500',
      status: 'Not Started'
    },
    { 
      id: 6, 
      title: 'System Flowchart', 
      icon: GitBranch, 
      description: 'Process Visualization - Plant, Factory, and Enterprise Level Analysis',
      color: 'bg-indigo-500',
      status: 'Not Started'
    },
    { 
      id: 7, 
      title: 'Risk Assessment', 
      icon: Shield, 
      description: 'Comprehensive Risk Management - Market, Supply Chain, Currency, Operational Risks',
      color: 'bg-yellow-500',
      status: 'Not Started'
    },
    { 
      id: 8, 
      title: 'Quality Control', 
      icon: CheckCircle, 
      description: 'Quality Standards - NAFDAC, ISO 220000, HACCP + Organic, Pharmaceutical Grade',
      color: 'bg-teal-500',
      status: 'Not Started'
    },
    { 
      id: 9, 
      title: 'Market Analysis', 
      icon: Target, 
      description: 'Market Analysis and Demand - Retail, Wholesale, Industrial, Export Markets',
      color: 'bg-pink-500',
      status: 'Not Started'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-green-100 rounded-full">
            <User className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome, {userData?.name || 'User'}
            </h2>
            <p className="text-gray-600">
              FUTA Plantain Flour Production Business Case Development System
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <Calendar className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Registration Date</p>
              <p className="text-sm text-blue-700">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <Award className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Business Type</p>
              <p className="text-sm text-green-700">{userData?.businessType || 'Not specified'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
            <Building className="h-6 w-6 text-purple-600" />
            <div>
              <p className="font-medium text-purple-900">Department</p>
              <p className="text-sm text-purple-700">{userData?.department || 'Not specified'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">System Overview</h3>
        <p className="text-gray-600 mb-6">
          This comprehensive business case development system guides you through 9 essential modules 
          for establishing a successful plantain flour production business. Each module provides 
          detailed analysis and planning tools to ensure your business success.
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const Icon = module.icon;
          
          return (
            <div key={module.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 ${module.color} rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-500">Module {module.id}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      module.status === 'Not Started' 
                        ? 'bg-gray-100 text-gray-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {module.status}
                    </span>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {module.title}
                </h4>
                
                <p className="text-sm text-gray-600">
                  {module.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Start Guide</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">For New Investors:</h4>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>Start with Investment Planning (Module 1)</li>
              <li>Complete Business Case Analysis (Module 2)</li>
              <li>Review Risk Assessment (Module 7)</li>
              <li>Analyze Market Demand (Module 9)</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">For Existing Businesses:</h4>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>Review Factory Layout Design (Module 3)</li>
              <li>Optimize Supplier Management (Module 4)</li>
              <li>Implement Quality Control (Module 8)</li>
              <li>Track Progress (Module 5)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;