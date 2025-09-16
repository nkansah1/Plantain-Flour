import React, { useState } from 'react';
import { DollarSign, MapPin, Home, Calculator } from 'lucide-react';

const InvestmentPlanning = () => {
  const [formData, setFormData] = useState({
    availableCapital: '',
    hasLand: '',
    landSize: '',
    factoryLocation: '',
    investmentType: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateEstimatedCosts = () => {
    const capital = parseFloat(formData.availableCapital) || 0;
    const landCost = formData.hasLand === 'no' ? capital * 0.2 : 0;
    const equipmentCost = capital * 0.4;
    const workingCapital = capital * 0.3;
    const miscellaneous = capital * 0.1;

    return {
      landCost,
      equipmentCost,
      workingCapital,
      miscellaneous,
      total: landCost + equipmentCost + workingCapital + miscellaneous
    };
  };

  const costs = calculateEstimatedCosts();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-full">
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Investment Planning & Analysis</h2>
            <p className="text-gray-600">Module 1: Comprehensive investment planning for your plantain flour production business</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Investment Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Capital (₦)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="availableCapital"
                  value={formData.availableCapital}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your available capital"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have Land?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasLand"
                    value="yes"
                    checked={formData.hasLand === 'yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes, I have land
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasLand"
                    value="no"
                    checked={formData.hasLand === 'no'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No, I need to acquire land
                </label>
              </div>
            </div>

            {formData.hasLand && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Land Size (plots)
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter land size in plots"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Factory Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="factoryLocation"
                  value={formData.factoryLocation}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select location</option>
                  <option value="urban">Urban Area</option>
                  <option value="suburban">Suburban Area</option>
                  <option value="rural">Rural Area</option>
                  <option value="industrial">Industrial Zone</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Type
              </label>
              <select
                name="investmentType"
                value={formData.investmentType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select investment type</option>
                <option value="sole">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="corporation">Corporation</option>
                <option value="cooperative">Cooperative</option>
              </select>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Estimated Cost Breakdown</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Land Acquisition</span>
                  <span className="font-medium">₦{costs.landCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Equipment & Machinery</span>
                  <span className="font-medium">₦{costs.equipmentCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Working Capital</span>
                  <span className="font-medium">₦{costs.workingCapital.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Miscellaneous</span>
                  <span className="font-medium">₦{costs.miscellaneous.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 text-lg font-bold text-blue-600">
                  <span>Total Investment Required</span>
                  <span>₦{costs.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {formData.availableCapital && (
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-2">Investment Analysis</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-green-700">
                    Available Capital: ₦{parseFloat(formData.availableCapital).toLocaleString()}
                  </p>
                  <p className="text-green-700">
                    Required Investment: ₦{costs.total.toLocaleString()}
                  </p>
                  <p className={`font-medium ${
                    parseFloat(formData.availableCapital) >= costs.total 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {parseFloat(formData.availableCapital) >= costs.total 
                      ? '✓ Capital is sufficient for investment'
                      : '⚠ Additional funding required: ₦' + (costs.total - parseFloat(formData.availableCapital)).toLocaleString()
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Investment Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlanning;