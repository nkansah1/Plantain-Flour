import React, { useState } from 'react';
import { Building, Layout, Zap, Users } from 'lucide-react';

const FactoryLayoutDesign = () => {
  const [layoutConfig, setLayoutConfig] = useState({
    factorySize: '',
    productionLine: 'single',
    automationLevel: 'semi',
    storageArea: '',
    officeSpace: '',
    utilityArea: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLayoutConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const layoutAreas = [
    { name: 'Raw Material Storage', color: 'bg-yellow-200', percentage: 20 },
    { name: 'Processing Area', color: 'bg-blue-200', percentage: 35 },
    { name: 'Packaging Section', color: 'bg-green-200', percentage: 15 },
    { name: 'Finished Goods Storage', color: 'bg-purple-200', percentage: 20 },
    { name: 'Office & Admin', color: 'bg-gray-200', percentage: 5 },
    { name: 'Utilities & Maintenance', color: 'bg-red-200', percentage: 5 }
  ];

  const equipmentList = [
    { category: 'Cleaning & Preparation', items: ['Plantain Washer', 'Peeling Machine', 'Slicing Equipment'] },
    { category: 'Processing', items: ['Steam Blancher', 'Dehydrator/Dryer', 'Grinding Mill'] },
    { category: 'Packaging', items: ['Sieving Machine', 'Packaging Machine', 'Sealing Equipment'] },
    { category: 'Quality Control', items: ['Moisture Analyzer', 'Testing Laboratory', 'Weighing Scales'] },
    { category: 'Utilities', items: ['Boiler System', 'Generator', 'Water Treatment Plant'] }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 rounded-full">
            <Building className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Factory Layout Design</h2>
            <p className="text-gray-600">Module 3: Automated facility planning and layout optimization</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Layout Configuration</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Factory Size (sq ft)
              </label>
              <input
                type="number"
                name="factorySize"
                value={layoutConfig.factorySize}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter total factory area"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Production Line Configuration
              </label>
              <select
                name="productionLine"
                value={layoutConfig.productionLine}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="single">Single Production Line</option>
                <option value="dual">Dual Production Lines</option>
                <option value="multiple">Multiple Lines (3+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Automation Level
              </label>
              <select
                name="automationLevel"
                value={layoutConfig.automationLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="manual">Manual Operations</option>
                <option value="semi">Semi-Automated</option>
                <option value="full">Fully Automated</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raw Material Storage (sq ft)
              </label>
              <input
                type="number"
                name="storageArea"
                value={layoutConfig.storageArea}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Storage area requirement"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Office Space (sq ft)
              </label>
              <input
                type="number"
                name="officeSpace"
                value={layoutConfig.officeSpace}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Office area requirement"
              />
            </div>
          </div>

          {/* Layout Visualization */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Layout Visualization</h3>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Layout className="h-6 w-6 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Recommended Area Distribution</h4>
              </div>
              
              <div className="space-y-3">
                {layoutAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${area.color}`}></div>
                    <div className="flex-1 flex justify-between">
                      <span className="text-sm text-gray-700">{area.name}</span>
                      <span className="text-sm font-medium text-gray-900">{area.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {layoutConfig.factorySize && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h5 className="font-medium text-gray-900 mb-2">Calculated Areas (sq ft)</h5>
                  <div className="space-y-1 text-sm">
                    {layoutAreas.map((area, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{area.name}</span>
                        <span className="font-medium">
                          {Math.round((parseFloat(layoutConfig.factorySize) * area.percentage) / 100).toLocaleString()} sq ft
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Automation Benefits</h4>
              </div>
              
              <div className="space-y-2 text-sm">
                {layoutConfig.automationLevel === 'full' && (
                  <>
                    <p className="text-blue-700">✓ 40-50% reduction in labor costs</p>
                    <p className="text-blue-700">✓ Consistent product quality</p>
                    <p className="text-blue-700">✓ Higher production efficiency</p>
                    <p className="text-blue-700">✓ Reduced contamination risk</p>
                  </>
                )}
                {layoutConfig.automationLevel === 'semi' && (
                  <>
                    <p className="text-blue-700">✓ 20-30% reduction in labor costs</p>
                    <p className="text-blue-700">✓ Improved product consistency</p>
                    <p className="text-blue-700">✓ Moderate efficiency gains</p>
                  </>
                )}
                {layoutConfig.automationLevel === 'manual' && (
                  <>
                    <p className="text-yellow-700">• Lower initial investment</p>
                    <p className="text-yellow-700">• Higher labor requirements</p>
                    <p className="text-yellow-700">• Variable product quality</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Requirements */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-6 w-6 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Equipment Requirements</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentList.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">{category.category}</h4>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Layout Recommendations */}
        <div className="mt-8 bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Layout Recommendations</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-900 mb-2">Process Flow Optimization</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Raw materials should flow in one direction</li>
                <li>• Minimize cross-contamination points</li>
                <li>• Ensure adequate spacing for equipment maintenance</li>
                <li>• Design for future expansion capabilities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-900 mb-2">Safety & Compliance</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Install proper ventilation systems</li>
                <li>• Ensure fire safety compliance</li>
                <li>• Design for easy cleaning and sanitization</li>
                <li>• Include quality control checkpoints</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Save Factory Layout Design
          </button>
        </div>
      </div>
    </div>
  );
};

export default FactoryLayoutDesign;