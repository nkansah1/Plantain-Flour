import React, { useState } from 'react';
import { TrendingUp, Calendar, Target, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ProgressTracking = () => {
  const [trackingData, setTrackingData] = useState({
    startingQuarter: 'Q1',
    year: new Date().getFullYear(),
    targetRevenue: '',
    targetProduction: ''
  });

  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrackingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if both target fields have values
    if (trackingData.targetRevenue && trackingData.targetProduction) {
      setIsDataSubmitted(true);
      setSubmittedData({ ...trackingData });
      
      // Show success feedback
      setTimeout(() => {
        setIsDataSubmitted(false);
      }, 3000);
    }
  };

  // Sample quarterly data
  const quarterlyData = [
    { quarter: 'Q1 2024', revenue: 2500000, production: 5000, target: 3000000, expenses: 1800000 },
    { quarter: 'Q2 2024', revenue: 3200000, production: 6500, target: 3200000, expenses: 2100000 },
    { quarter: 'Q3 2024', revenue: 3800000, production: 7200, target: 3500000, expenses: 2300000 },
    { quarter: 'Q4 2024', revenue: 4200000, production: 8000, target: 4000000, expenses: 2500000 }
  ];

  // Update data based on user input if available
  const updatedQuarterlyData = submittedData 
    ? quarterlyData.map((q, index) => {
        // Ensure we have valid numbers
        const userTargetRevenue = parseInt(submittedData.targetRevenue) || 4000000;
        const userTargetProduction = parseInt(submittedData.targetProduction) || 8000;
        
        // Apply user's target revenue to the last quarter
        const updatedTarget = index === 3 
          ? userTargetRevenue
          : q.target;
        
        // Adjust other quarters proportionally for a more realistic progression
        const baseRevenue = [2500000, 3200000, 3800000, 4200000];
        const revenueMultiplier = userTargetRevenue / 4000000;
        const updatedRevenue = index < 3 
          ? Math.round(baseRevenue[index] * revenueMultiplier) 
          : q.revenue;
        
        // Adjust production based on user's target production
        const productionMultiplier = userTargetProduction / 8000;
        const updatedProduction = Math.round(q.production * productionMultiplier);
        
        return {
          ...q,
          revenue: updatedRevenue,
          production: updatedProduction,
          target: updatedTarget
        };
      })
    : quarterlyData;

  const kpiData = [
    { name: 'Production Efficiency', current: 85, target: 90, unit: '%' },
    { name: 'Quality Rating', current: 92, target: 95, unit: '%' },
    { name: 'On-time Delivery', current: 88, target: 95, unit: '%' },
    { name: 'Cost per kg', current: 450, target: 400, unit: '₦' },
    { name: 'Customer Satisfaction', current: 4.2, target: 4.5, unit: '/5' }
  ];

  const calculateGrowthRate = (data) => {
    if (data.length < 2) return 0;
    const firstValue = data[0].revenue;
    const lastValue = data[data.length - 1].revenue;
    return ((lastValue - firstValue) / firstValue * 100).toFixed(1);
  };

  // Calculate updated metrics based on user input
  const totalRevenue = updatedQuarterlyData.reduce((sum, q) => sum + q.revenue, 0);
  const totalProduction = updatedQuarterlyData.reduce((sum, q) => sum + q.production, 0);
  const avgProfitMargin = (updatedQuarterlyData.reduce((sum, q) => sum + ((q.revenue - q.expenses) / q.revenue * 100), 0) / updatedQuarterlyData.length);
  const targetAchievement = (updatedQuarterlyData[updatedQuarterlyData.length - 1].revenue / updatedQuarterlyData[updatedQuarterlyData.length - 1].target) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-100 rounded-full">
            <TrendingUp className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Progress Tracking</h2>
            <p className="text-gray-600">Module 5: Quarterly turnover analysis and performance monitoring</p>
          </div>
        </div>

        {/* Configuration */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Starting Quarter</label>
            <select
              name="startingQuarter"
              value={trackingData.startingQuarter}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <input
              type="number"
              name="year"
              value={trackingData.year}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Revenue (₦)</label>
            <input
              type="number"
              name="targetRevenue"
              value={trackingData.targetRevenue}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Annual target"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Production (kg)</label>
            <input
              type="number"
              name="targetProduction"
              value={trackingData.targetProduction}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Annual target"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-6">
          <button 
            onClick={handleSubmit}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Target className="h-5 w-5" />
            Update Targets
          </button>
          
          {/* Feedback Message */}
          {isDataSubmitted && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              Targets updated successfully! All metrics have been recalculated.
            </div>
          )}
        </div>

        {/* Performance Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Total Revenue</h3>
            </div>
            <p className="text-2xl font-bold text-blue-900">
              ₦{totalRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-blue-700 mt-1">+{calculateGrowthRate(updatedQuarterlyData)}% growth</p>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-green-900">Total Production</h3>
            </div>
            <p className="text-2xl font-bold text-green-900">
              {totalProduction.toLocaleString()} kg
            </p>
            <p className="text-sm text-green-700 mt-1">Across 4 quarters</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-purple-900">Avg Profit Margin</h3>
            </div>
            <p className="text-2xl font-bold text-purple-900">
              {avgProfitMargin.toFixed(1)}%
            </p>
            <p className="text-sm text-purple-700 mt-1">Quarterly average</p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-6 w-6 text-yellow-600" />
              <h3 className="font-semibold text-yellow-900">Target Achievement</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-900">
              {isNaN(targetAchievement) ? 0 : targetAchievement.toFixed(0)}%
            </p>
            <p className="text-sm text-yellow-700 mt-1">Latest quarter</p>
          </div>
        </div>

        {/* Revenue vs Target Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quarterly Revenue vs Target</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={updatedQuarterlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis tickFormatter={(value) => `₦${(value/1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => [`₦${(value/1000000).toFixed(1)}M`]} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Actual Revenue" />
                <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Target Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Production & Profitability Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Volume & Profitability</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={updatedQuarterlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="production" fill="#3b82f6" name="Production (kg)" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses (₦)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI Dashboard */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Performance Indicators</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpiData.map((kpi, index) => {
              const percentage = kpi.unit === '%' ? (kpi.current / kpi.target) * 100 : 
                                kpi.unit === '₦' ? (kpi.target / kpi.current) * 100 :
                                (kpi.current / kpi.target) * 100;
              const isOnTarget = percentage >= 95;
              
              return (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">{kpi.name}</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold text-gray-900">
                      {kpi.current}{kpi.unit}
                    </span>
                    <span className="text-sm text-gray-600">
                      / {kpi.target}{kpi.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${isOnTarget ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className={`text-xs ${isOnTarget ? 'text-green-600' : 'text-yellow-600'}`}>
                    {isOnTarget ? 'On Target' : `${percentage.toFixed(1)}% of target`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Save Progress Tracking Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;