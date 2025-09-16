import React, { useState } from 'react';
import { Truck, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

const SupplierManagement = () => {
  const [supplierData, setSupplierData] = useState({
    scarcityLevel: '',
    seasonalVariation: '',
    supplierCount: '',
    contractType: '',
    qualityStandard: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const suppliers = [
    { name: 'Farmland Cooperative', location: 'Ondo State', capacity: '500kg/day', reliability: 85, quality: 'Grade A' },
    { name: 'Green Valley Farms', location: 'Ogun State', capacity: '800kg/day', reliability: 92, quality: 'Grade A+' },
    { name: 'Tropical Harvest Ltd', location: 'Osun State', capacity: '1200kg/day', reliability: 78, quality: 'Grade B+' },
    { name: 'Plantain Growers Union', location: 'Ekiti State', capacity: '300kg/day', reliability: 88, quality: 'Grade A' },
  ];

  const riskAssessment = () => {
    switch (supplierData.scarcityLevel) {
      case 'low':
        return { level: 'Low Risk', color: 'text-green-600', bg: 'bg-green-50' };
      case 'medium':
        return { level: 'Medium Risk', color: 'text-yellow-600', bg: 'bg-yellow-50' };
      case 'high':
        return { level: 'High Risk', color: 'text-red-600', bg: 'bg-red-50' };
      default:
        return { level: 'Not Assessed', color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  const risk = riskAssessment();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-orange-100 rounded-full">
            <Truck className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Supplier Management</h2>
            <p className="text-gray-600">Module 4: Supply chain optimization and raw material management</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Supply Chain Assessment */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Supply Chain Assessment</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raw Material Scarcity Level
              </label>
              <select
                name="scarcityLevel"
                value={supplierData.scarcityLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select scarcity level</option>
                <option value="low">Low (Abundant Supply)</option>
                <option value="medium">Medium (Seasonal Variations)</option>
                <option value="high">High (Frequent Shortages)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seasonal Variation Impact
              </label>
              <select
                name="seasonalVariation"
                value={supplierData.seasonalVariation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select impact level</option>
                <option value="minimal">Minimal (Year-round availability)</option>
                <option value="moderate">Moderate (2-3 months shortage)</option>
                <option value="significant">Significant (4-6 months shortage)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Active Suppliers
              </label>
              <input
                type="number"
                name="supplierCount"
                value={supplierData.supplierCount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter number of suppliers"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Contract Type
              </label>
              <select
                name="contractType"
                value={supplierData.contractType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select contract type</option>
                <option value="spot">Spot Purchase</option>
                <option value="monthly">Monthly Contracts</option>
                <option value="seasonal">Seasonal Contracts</option>
                <option value="annual">Annual Contracts</option>
                <option value="partnership">Long-term Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Quality Standard
              </label>
              <select
                name="qualityStandard"
                value={supplierData.qualityStandard}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select quality standard</option>
                <option value="basic">Basic Quality</option>
                <option value="premium">Premium Quality</option>
                <option value="organic">Organic Certified</option>
                <option value="export">Export Quality</option>
              </select>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="space-y-6">
            <div className={`${risk.bg} rounded-lg p-6`}>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className={`h-6 w-6 ${risk.color}`} />
                <h3 className="text-lg font-semibold text-gray-900">Supply Risk Assessment</h3>
              </div>
              
              <div className={`text-xl font-bold ${risk.color} mb-4`}>
                {risk.level}
              </div>

              <div className="space-y-3">
                {supplierData.scarcityLevel === 'low' && (
                  <div className="space-y-2 text-sm text-green-700">
                    <p>✓ Abundant raw material supply</p>
                    <p>✓ Stable pricing expected</p>
                    <p>✓ Low supply chain disruption risk</p>
                    <p>✓ Multiple supplier options available</p>
                  </div>
                )}
                {supplierData.scarcityLevel === 'medium' && (
                  <div className="space-y-2 text-sm text-yellow-700">
                    <p>⚠ Seasonal supply variations expected</p>
                    <p>⚠ Price fluctuations likely</p>
                    <p>⚠ Inventory management critical</p>
                    <p>⚠ Contract farming recommended</p>
                  </div>
                )}
                {supplierData.scarcityLevel === 'high' && (
                  <div className="space-y-2 text-sm text-red-700">
                    <p>⚠ Frequent supply shortages</p>
                    <p>⚠ High price volatility</p>
                    <p>⚠ Production planning challenges</p>
                    <p>⚠ Alternative sources required</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-2">Mitigation Strategies</h4>
              <div className="space-y-2 text-sm text-blue-700">
                <p>• Diversify supplier base across regions</p>
                <p>• Establish strategic inventory reserves</p>
                <p>• Implement contract farming programs</p>
                <p>• Develop alternative raw material sources</p>
                <p>• Create supplier development initiatives</p>
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Database */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Potential Suppliers Database</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Supplier Name
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Location
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Daily Capacity
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Reliability Score
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Quality Grade
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                      {supplier.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                      {supplier.location}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                      {supplier.capacity}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          supplier.reliability >= 90 ? 'bg-green-500' :
                          supplier.reliability >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        {supplier.reliability}%
                      </div>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        supplier.quality.includes('A+') ? 'bg-green-100 text-green-800' :
                        supplier.quality.includes('A') ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {supplier.quality}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-sm">
                      <button className="text-orange-600 hover:text-orange-800 font-medium">
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            Save Supplier Management Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierManagement;