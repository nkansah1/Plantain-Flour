import React, { useState } from 'react';
import { Target, TrendingUp, Globe, Users } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MarketAnalysis = () => {
  const [selectedMarket, setSelectedMarket] = useState('retail');

  const marketSegments = {
    retail: {
      name: 'Retail Consumer',
      description: 'Direct sales to end consumers through retail outlets',
      size: '₦2.5B',
      growth: '15%',
      competition: 'High',
      margin: '25-35%',
      channels: ['Supermarkets', 'Local stores', 'Online platforms', 'Farmers markets'],
      strategy: 'Brand building, quality assurance, competitive pricing',
      color: '#3b82f6'
    },
    wholesale: {
      name: 'Wholesale Distribution',
      description: 'Bulk sales to distributors and retailers',
      size: '₦1.8B',
      growth: '12%',
      competition: 'Medium',
      margin: '15-25%',
      channels: ['Distributors', 'Wholesalers', 'Retail chains', 'Food service'],
      strategy: 'Volume pricing, logistics optimization, relationship building',
      color: '#10b981'
    },
    industrial: {
      name: 'Food Processing Industries',
      description: 'B2B sales to food manufacturers and processors',
      size: '₦3.2B',
      growth: '20%',
      competition: 'Low',
      margin: '20-30%',
      channels: ['Bakeries', 'Snack manufacturers', 'Baby food companies', 'Health food producers'],
      strategy: 'Consistent quality, bulk supply, technical support',
      color: '#f59e0b'
    },
    export: {
      name: 'Export Market',
      description: 'International sales to global markets',
      size: '₦5.5B',
      growth: '25%',
      competition: 'Medium',
      margin: '35-50%',
      channels: ['Export agents', 'International distributors', 'Direct importers', 'E-commerce'],
      strategy: 'Quality certification, competitive pricing, reliable supply',
      color: '#ef4444'
    },
    mixed: {
      name: 'Mixed Portfolio',
      description: 'Diversified approach across multiple segments',
      size: '₦12B',
      growth: '18%',
      competition: 'Varied',
      margin: '25-40%',
      channels: ['All channels combined', 'Risk diversification', 'Market penetration'],
      strategy: 'Portfolio management, segment optimization, risk mitigation',
      color: '#8b5cf6'
    }
  };

  const marketData = [
    { name: 'Retail Consumer', value: 20, color: '#3b82f6' },
    { name: 'Wholesale', value: 15, color: '#10b981' },
    { name: 'Industrial', value: 25, color: '#f59e0b' },
    { name: 'Export', value: 35, color: '#ef4444' },
    { name: 'Others', value: 5, color: '#6b7280' }
  ];

  const demandForecast = [
    { year: '2024', retail: 2500, wholesale: 1800, industrial: 3200, export: 5500 },
    { year: '2025', retail: 2875, wholesale: 2016, industrial: 3840, export: 6875 },
    { year: '2026', retail: 3306, wholesale: 2258, industrial: 4608, export: 8594 },
    { year: '2027', retail: 3802, wholesale: 2529, industrial: 5530, export: 10742 },
    { year: '2028', retail: 4372, wholesale: 2833, industrial: 6636, export: 13428 }
  ];

  const competitorAnalysis = [
    { name: 'Company A', marketShare: 25, strength: 'Brand recognition', weakness: 'High prices' },
    { name: 'Company B', marketShare: 20, strength: 'Distribution network', weakness: 'Quality issues' },
    { name: 'Company C', marketShare: 15, strength: 'Cost leadership', weakness: 'Limited variety' },
    { name: 'Company D', marketShare: 12, strength: 'Export focus', weakness: 'Local presence' },
    { name: 'Others', marketShare: 28, strength: 'Various', weakness: 'Fragmented' }
  ];

  const currentMarket = marketSegments[selectedMarket];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-pink-100 rounded-full">
            <Target className="h-8 w-8 text-pink-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Market Analysis & Demand</h2>
            <p className="text-gray-600">Module 9: Market analysis and demand forecasting</p>
          </div>
        </div>

        {/* Market Segment Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Market Segments</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(marketSegments).map(([key, segment]) => (
              <button
                key={key}
                onClick={() => setSelectedMarket(key)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedMarket === key
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900 mb-2">{segment.name}</div>
                <div className="text-sm text-gray-600 mb-2">{segment.description}</div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Size: {segment.size}</span>
                  <span className="text-green-600">+{segment.growth}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Market Details */}
        <div className="bg-pink-50 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-6 w-6 text-pink-600" />
            <h3 className="text-xl font-bold text-gray-900">{currentMarket.name}</h3>
          </div>
          
          <p className="text-gray-700 mb-6">{currentMarket.description}</p>
          
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 border border-pink-200">
              <p className="text-sm text-gray-600">Market Size</p>
              <p className="text-2xl font-bold text-pink-600">{currentMarket.size}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-pink-200">
              <p className="text-sm text-gray-600">Growth Rate</p>
              <p className="text-2xl font-bold text-green-600">+{currentMarket.growth}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-pink-200">
              <p className="text-sm text-gray-600">Competition</p>
              <p className={`text-2xl font-bold ${
                currentMarket.competition === 'Low' ? 'text-green-600' :
                currentMarket.competition === 'Medium' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {currentMarket.competition}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-pink-200">
              <p className="text-sm text-gray-600">Profit Margin</p>
              <p className="text-2xl font-bold text-purple-600">{currentMarket.margin}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Distribution Channels</h4>
              <ul className="space-y-2">
                {currentMarket.channels.map((channel, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    {channel}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Market Strategy</h4>
              <p className="text-sm text-gray-700">{currentMarket.strategy}</p>
            </div>
          </div>
        </div>

        {/* Market Share Visualization */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Share Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {marketData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitor Analysis</h3>
            <div className="space-y-3">
              {competitorAnalysis.map((competitor, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{competitor.name}</span>
                    <span className="text-sm font-semibold text-blue-600">{competitor.marketShare}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-green-600">Strength: </span>
                      <span className="text-gray-700">{competitor.strength}</span>
                    </div>
                    <div>
                      <span className="text-red-600">Weakness: </span>
                      <span className="text-gray-700">{competitor.weakness}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demand Forecast */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">5-Year Demand Forecast (₦ Millions)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandForecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [`₦${value}M`]} />
                <Legend />
                <Bar dataKey="retail" fill="#3b82f6" name="Retail Consumer" />
                <Bar dataKey="wholesale" fill="#10b981" name="Wholesale" />
                <Bar dataKey="industrial" fill="#f59e0b" name="Industrial" />
                <Bar dataKey="export" fill="#ef4444" name="Export" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Entry Strategy */}
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">Market Entry Strategy</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Phase 1: Market Entry</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Focus on retail consumer segment</li>
                <li>• Build brand awareness</li>
                <li>• Establish distribution network</li>
                <li>• Competitive pricing strategy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Phase 2: Market Expansion</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Enter industrial segment</li>
                <li>• Develop wholesale channels</li>
                <li>• Scale production capacity</li>
                <li>• Quality certifications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Phase 3: Market Leadership</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Export market penetration</li>
                <li>• Premium product lines</li>
                <li>• Strategic partnerships</li>
                <li>• Market dominance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
            Save Market Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;