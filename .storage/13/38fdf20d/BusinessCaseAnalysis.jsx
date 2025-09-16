import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const BusinessCaseAnalysis = () => {
  const [formData, setFormData] = useState({
    dailyCapacity: '',
    sellingPrice: '',
    currencyFactor: '1.0',
    operatingDays: '300',
    laborCost: '',
    utilityCost: '',
    maintenanceCost: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateFinancials = () => {
    const dailyCapacity = parseFloat(formData.dailyCapacity) || 0;
    const sellingPrice = parseFloat(formData.sellingPrice) || 0;
    const currencyFactor = parseFloat(formData.currencyFactor) || 1;
    const operatingDays = parseInt(formData.operatingDays) || 300;
    const laborCost = parseFloat(formData.laborCost) || 0;
    const utilityCost = parseFloat(formData.utilityCost) || 0;
    const maintenanceCost = parseFloat(formData.maintenanceCost) || 0;

    const dailyRevenue = dailyCapacity * sellingPrice * currencyFactor;
    const annualRevenue = dailyRevenue * operatingDays;
    const dailyCosts = laborCost + utilityCost + maintenanceCost;
    const annualCosts = dailyCosts * operatingDays;
    const annualProfit = annualRevenue - annualCosts;
    const profitMargin = annualRevenue > 0 ? (annualProfit / annualRevenue) * 100 : 0;

    return {
      dailyRevenue,
      annualRevenue,
      dailyCosts,
      annualCosts,
      annualProfit,
      profitMargin
    };
  };

  const generateProjectionData = () => {
    const baseRevenue = calculateFinancials().annualRevenue;
    const data = [];
    
    for (let year = 1; year <= 5; year++) {
      const growthRate = 0.15; // 15% annual growth
      const revenue = baseRevenue * Math.pow(1 + growthRate, year - 1);
      const costs = calculateFinancials().annualCosts * Math.pow(1.08, year - 1); // 8% cost inflation
      
      data.push({
        year: `Year ${year}`,
        revenue: revenue / 1000000, // Convert to millions
        costs: costs / 1000000,
        profit: (revenue - costs) / 1000000
      });
    }
    
    return data;
  };

  const financials = calculateFinancials();
  const projectionData = generateProjectionData();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 rounded-full">
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Business Case Analysis</h2>
            <p className="text-gray-600">Module 2: Complete financial analysis and projections</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Input Form */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Production & Pricing Parameters</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Processing Capacity (kg)
              </label>
              <input
                type="number"
                name="dailyCapacity"
                value={formData.dailyCapacity}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter daily capacity in kg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selling Price per kg (₦)
              </label>
              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter selling price per kg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency Depreciation Factor
              </label>
              <select
                name="currencyFactor"
                value={formData.currencyFactor}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="1.0">No Depreciation (1.0)</option>
                <option value="1.05">Low Risk (1.05)</option>
                <option value="1.10">Medium Risk (1.10)</option>
                <option value="1.15">High Risk (1.15)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operating Days per Year
              </label>
              <input
                type="number"
                name="operatingDays"
                value={formData.operatingDays}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter operating days"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mt-6">Daily Operating Costs</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Labor Cost (₦)
              </label>
              <input
                type="number"
                name="laborCost"
                value={formData.laborCost}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter daily labor cost"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Utility Cost (₦)
              </label>
              <input
                type="number"
                name="utilityCost"
                value={formData.utilityCost}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter daily utility cost"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Maintenance Cost (₦)
              </label>
              <input
                type="number"
                name="maintenanceCost"
                value={formData.maintenanceCost}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter daily maintenance cost"
              />
            </div>
          </div>

          {/* Financial Summary */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Financial Summary</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Daily Revenue</p>
                    <p className="text-xl font-bold text-blue-900">
                      ₦{financials.dailyRevenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Daily Costs</p>
                    <p className="text-xl font-bold text-red-900">
                      ₦{financials.dailyCosts.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Revenue</span>
                    <span className="font-medium">₦{financials.annualRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Costs</span>
                    <span className="font-medium">₦{financials.annualCosts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span className={financials.annualProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      Annual Profit
                    </span>
                    <span className={financials.annualProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      ₦{financials.annualProfit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profit Margin</span>
                    <span className={`font-medium ${financials.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {financials.profitMargin.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-2">Business Viability Assessment</h4>
              <div className="space-y-2 text-sm">
                {financials.profitMargin >= 20 && (
                  <p className="text-green-700">✓ Excellent profit margin - Highly viable business</p>
                )}
                {financials.profitMargin >= 10 && financials.profitMargin < 20 && (
                  <p className="text-green-700">✓ Good profit margin - Viable business</p>
                )}
                {financials.profitMargin >= 0 && financials.profitMargin < 10 && (
                  <p className="text-yellow-700">⚠ Low profit margin - Consider cost optimization</p>
                )}
                {financials.profitMargin < 0 && (
                  <p className="text-red-700">⚠ Negative profit - Business model needs revision</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Projections Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">5-Year Financial Projections (₦ Millions)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [`₦${value.toFixed(1)}M`]} />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                <Bar dataKey="costs" fill="#ef4444" name="Costs" />
                <Bar dataKey="profit" fill="#3b82f6" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Save Business Case Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCaseAnalysis;