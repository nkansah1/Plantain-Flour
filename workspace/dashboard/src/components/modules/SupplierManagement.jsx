import React, { useState } from 'react';
import { Truck, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

const SupplierManagement = () => {
  const [formData, setFormData] = useState({
    scarcityLevel: 'low',
    supplierCount: '5'
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const analyzeSuppliers = () => {
    const scarcity = formData.scarcityLevel;
    const supplierCount = parseInt(formData.supplierCount) || 5;

    let strategy, riskLevel, recommendations, contractTerms;

    switch(scarcity) {
      case 'low':
        strategy = 'Cost-focused procurement with 2-3 primary suppliers';
        riskLevel = 'Low';
        recommendations = [
          'Focus on price negotiation and bulk discounts',
          'Establish long-term contracts for price stability',
          'Implement quality control standards',
          'Maintain 1-2 backup suppliers'
        ];
        contractTerms = 'Annual contracts with quarterly reviews';
        break;
      case 'medium':
        strategy = 'Diversified supplier base with seasonal planning';
        riskLevel = 'Medium';
        recommendations = [
          'Maintain 5-7 suppliers across different regions',
          'Implement seasonal inventory planning',
          'Develop storage facilities for peak season procurement',
          'Establish farmer cooperative partnerships'
        ];
        contractTerms = 'Flexible 6-month contracts with price adjustment clauses';
        break;
      case 'high':
        strategy = 'Multi-source procurement with vertical integration';
        riskLevel = 'High';
        recommendations = [
          'Maintain 8-10 suppliers minimum',
          'Consider backward integration (own plantain farms)',
          'Develop alternative raw material sources',
          'Implement advanced inventory management',
          'Establish strategic partnerships with farmers'
        ];
        contractTerms = 'Short-term flexible contracts with premium pricing';
        break;
      default:
        strategy = 'Standard procurement approach';
        riskLevel = 'Low';
        recommendations = [
          'Establish primary and backup suppliers',
          'Implement quality standards',
          'Monitor market prices regularly'
        ];
        contractTerms = 'Standard annual contracts';
    }

    const supplierProfile = generateSupplierProfile(supplierCount, scarcity);

    const analysisResults = {
      strategy,
      riskLevel,
      recommendations,
      contractTerms,
      supplierProfile
    };

    setResults(analysisResults);
  };

  const generateSupplierProfile = (count, scarcity) => {
    const regions = ['Ogun', 'Oyo', 'Osun', 'Ekiti', 'Ondo', 'Lagos', 'Kwara'];
    const supplierTypes = ['Individual Farmers', 'Cooperatives', 'Aggregators', 'Plantation Owners'];
    
    const profiles = [];
    for (let i = 1; i <= count; i++) {
      const region = regions[Math.floor(Math.random() * regions.length)];
      const type = supplierTypes[Math.floor(Math.random() * supplierTypes.length)];
      const capacity = scarcity === 'high' ? Math.floor(Math.random() * 200) + 50 : 
                     scarcity === 'medium' ? Math.floor(Math.random() * 300) + 150 :
                     Math.floor(Math.random() * 500) + 200;
      const reliability = scarcity === 'high' ? 
        ['Medium', 'High'][Math.floor(Math.random() * 2)] :
        scarcity === 'medium' ? 'High' : 'Very High';
      
      profiles.push({
        id: `SUP-${i.toString().padStart(3, '0')}`,
        region,
        type,
        capacity,
        reliability
      });
    }
    
    return profiles;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-orange-100 rounded-full">
            <Truck className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Supplier Management</h2>
            <p className="text-gray-600">Module 4: Supply chain optimization and supplier selection models for raw material procurement</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raw Material Scarcity Level:
              </label>
              <select
                name="scarcityLevel"
                value={formData.scarcityLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="low">Low (Abundant supply)</option>
                <option value="medium">Medium (Seasonal variations)</option>
                <option value="high">High (Frequent shortages)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Suppliers Needed:
              </label>
              <input
                type="number"
                name="supplierCount"
                value={formData.supplierCount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Recommended: 5-10"
                min="1"
                max="20"
              />
            </div>

            <button 
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              onClick={analyzeSuppliers}
            >
              Analyze Supplier Strategy
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Supplier Management Analysis</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Supply Chain Strategy:</h4>
                    <p className="text-sm"><strong>Strategy:</strong> {results.strategy}</p>
                    <p className="text-sm"><strong>Risk Level:</strong> {results.riskLevel}</p>
                    <p className="text-sm"><strong>Contract Terms:</strong> {results.contractTerms}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 h-full flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  Select your supply chain parameters and click "Analyze Supplier Strategy" to see recommendations
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Supplier Profile Matrix */}
        {results && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Profile Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">Supplier ID</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">Region</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">Type</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">Capacity (kg/day)</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">Reliability</th>
                  </tr>
                </thead>
                <tbody>
                  {results.supplierProfile.map((supplier, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-gray-900">{supplier.id}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">{supplier.region}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">{supplier.type}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">{supplier.capacity}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          supplier.reliability === 'Very High' ? 'bg-green-100 text-green-800' :
                          supplier.reliability === 'High' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {supplier.reliability}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Quality Standards:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                <li>Plantain maturity: 70-80% ripe</li>
                <li>Moisture content: {'<'}12%</li>
                <li>No physical damage or diseases</li>
                <li>Organic certification preferred</li>
                <li>Consistent supply capability</li>
              </ul>
            </div>
          </div>
        )}

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