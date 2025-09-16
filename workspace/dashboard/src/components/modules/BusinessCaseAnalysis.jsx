import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const BusinessCaseAnalysis = () => {
  const [formData, setFormData] = useState({
    processingCapacity: '1000',
    sellingPrice: '3500',
    depreciationFactor: '15'
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateBusinessCase = () => {
    const capacity = parseFloat(formData.processingCapacity) || 1000;
    const sellingPrice = parseFloat(formData.sellingPrice) || 3500;
    const depreciation = parseFloat(formData.depreciationFactor) || 15;

    // Conversion rate: 4kg plantain = 1kg flour
    const flourYield = capacity / 4;
    const dailyRevenue = flourYield * sellingPrice;
    const monthlyRevenue = dailyRevenue * 30;
    const annualRevenue = monthlyRevenue * 12;

    // Cost calculations
    const rawMaterialCost = capacity * 200; // ₦200 per kg plantain
    const utilityCost = 15000; // Daily utilities
    const staffCost = calculateStaffRequirements().totalMonthlySalary / 30;
    const maintenanceCost = 5000; // Daily maintenance
    const dailyOperatingCost = rawMaterialCost + utilityCost + staffCost + maintenanceCost;

    const dailyProfit = dailyRevenue - dailyOperatingCost;
    const monthlyProfit = dailyProfit * 30;
    const annualProfit = monthlyProfit * 12;

    const profitMargin = (dailyProfit / dailyRevenue) * 100;

    // Break-even analysis
    const fixedCosts = 40000000; // Total investment
    const variableCostPerKg = dailyOperatingCost / flourYield;
    const contributionMargin = sellingPrice - variableCostPerKg;
    const breakEvenUnits = fixedCosts / contributionMargin;
    const breakEvenDays = breakEvenUnits / flourYield;

    // Currency depreciation impact
    const depreciationMultiplier = 1 + (depreciation / 100);
    const adjustedRevenue = annualRevenue * depreciationMultiplier;

    const businessResults = {
      capacity,
      sellingPrice,
      flourYield,
      dailyRevenue,
      monthlyRevenue,
      annualRevenue,
      dailyOperatingCost,
      dailyProfit,
      monthlyProfit,
      annualProfit,
      profitMargin,
      breakEvenUnits,
      breakEvenDays,
      depreciation,
      adjustedRevenue,
      revenueImpact: adjustedRevenue - annualRevenue
    };

    setResults(businessResults);
  };

  const calculateStaffRequirements = () => {
    // For 1000kg/day capacity
    const staff = {
      productionManager: 1,
      qualityController: 1,
      machineOperators: 4,
      generalWorkers: 6,
      security: 2,
      cleaner: 1,
      accountant: 1,
      salesMarketing: 1
    };

    const salaries = {
      productionManager: 150000,
      qualityController: 120000,
      machineOperators: 60000,
      generalWorkers: 40000,
      security: 45000,
      cleaner: 35000,
      accountant: 100000,
      salesMarketing: 80000
    };

    let totalStaff = 0;
    let totalMonthlySalary = 0;

    for (let role in staff) {
      const count = staff[role];
      const salary = salaries[role];
      totalStaff += count;
      totalMonthlySalary += count * salary;
    }

    return {
      totalStaff,
      totalMonthlySalary
    };
  };

  const generateProjectionData = () => {
    if (!results) return [];
    
    const quarterlyTargets = {
      'Q1': [0.15, 0.20, 0.25, 0.40],
      'Q2': [0.20, 0.25, 0.30, 0.25],
      'Q3': [0.25, 0.30, 0.20, 0.25],
      'Q4': [0.30, 0.25, 0.20, 0.25]
    };

    // Using Q1 as default for projections
    const factors = quarterlyTargets['Q1'];
    const depreciationRate = results.depreciation / 100;
    
    const data = [];
    for (let year = 1; year <= 5; year++) {
      const factor = factors[Math.min(year - 1, factors.length - 1)];
      const target = results.annualRevenue * factor;
      const adjustedTarget = target * (1 + (depreciationRate * year));
      
      data.push({
        year: `Year ${year}`,
        revenue: target / 1000000,
        adjustedRevenue: adjustedTarget / 1000000
      });
    }
    
    return data;
  };

  const projectionData = generateProjectionData();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 rounded-full">
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Business Case Financial Analysis</h2>
            <p className="text-gray-600">Module 2: Complete financial analysis including processing capacity, pricing, profit margins, and break-even calculations</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Processing Capacity (kg):
              </label>
              <input
                type="number"
                name="processingCapacity"
                value={formData.processingCapacity}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Default: 1000kg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selling Price per kg (₦):
              </label>
              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Default: ₦3,500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency Depreciation Factor (%):
              </label>
              <input
                type="number"
                name="depreciationFactor"
                value={formData.depreciationFactor}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Annual depreciation rate"
              />
            </div>

            <button 
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={calculateBusinessCase}
            >
              Analyze Business Case
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Business Case Analysis Results</h3>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Production & Revenue:</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Daily Raw Plantain Processing:</span>
                      <span>{results.capacity}kg</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Daily Flour Production:</span>
                      <span>{results.flourYield}kg</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Daily Revenue:</span>
                      <span>₦{results.dailyRevenue.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Monthly Revenue:</span>
                      <span>₦{results.monthlyRevenue.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Annual Revenue:</span>
                      <span>₦{results.annualRevenue.toLocaleString()}</span>
                    </li>
                  </ul>

                  <h4 className="font-medium text-gray-900 pt-2">Costs & Profitability:</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Daily Operating Costs:</span>
                      <span>₦{results.dailyOperatingCost.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Daily Profit:</span>
                      <span>₦{results.dailyProfit.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Monthly Profit:</span>
                      <span>₦{results.monthlyProfit.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Annual Profit:</span>
                      <span>₦{results.annualProfit.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Profit Margin:</span>
                      <span>{results.profitMargin.toFixed(2)}%</span>
                    </li>
                  </ul>

                  <h4 className="font-medium text-gray-900 pt-2">Break-Even Analysis:</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Break-Even Units:</span>
                      <span>{results.breakEvenUnits.toLocaleString()}kg flour</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Break-Even Period:</span>
                      <span>{Math.ceil(results.breakEvenDays)} days</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Break-Even Point:</span>
                      <span>{(results.breakEvenDays/365).toFixed(2)} years</span>
                    </li>
                  </ul>

                  <h4 className="font-medium text-gray-900 pt-2">Currency Depreciation Impact:</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Depreciation Factor:</span>
                      <span>{results.depreciation}%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Adjusted Annual Revenue:</span>
                      <span>₦{results.adjustedRevenue.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Revenue Impact:</span>
                      <span>+₦{results.revenueImpact.toLocaleString()}</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 h-full flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  Enter your business parameters and click "Analyze Business Case" to see the financial analysis
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Financial Projections Chart */}
        {results && (
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
                  <Bar dataKey="adjustedRevenue" fill="#3b82f6" name="Adjusted Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

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