import React, { useState } from 'react';
import { Shield, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';

const RiskAssessment = () => {
  const [riskData, setRiskData] = useState({
    marketRisk: 'medium',
    supplyChainRisk: 'low',
    currencyRisk: 'high',
    operationalRisk: 'medium',
    regulatoryRisk: 'low',
    financialRisk: 'medium'
  });

  const handleRiskChange = (riskType, level) => {
    setRiskData(prev => ({
      ...prev,
      [riskType]: level
    }));
  };

  const riskTypes = [
    {
      id: 'marketRisk',
      name: 'Market Risk',
      description: 'Demand fluctuation, competition, price volatility',
      icon: TrendingDown,
      color: 'blue'
    },
    {
      id: 'supplyChainRisk',
      name: 'Supply Chain Risk',
      description: 'Raw material availability, supplier reliability',
      icon: Shield,
      color: 'green'
    },
    {
      id: 'currencyRisk',
      name: 'Currency Risk',
      description: 'Exchange rate fluctuation, inflation impact',
      icon: TrendingUp,
      color: 'red'
    },
    {
      id: 'operationalRisk',
      name: 'Operational Risk',
      description: 'Equipment failure, process disruption, quality issues',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      id: 'regulatoryRisk',
      name: 'Regulatory Risk',
      description: 'Policy changes, compliance requirements',
      icon: Shield,
      color: 'purple'
    },
    {
      id: 'financialRisk',
      name: 'Financial Risk',
      description: 'Cash flow, credit risk, investment returns',
      icon: TrendingDown,
      color: 'indigo'
    }
  ];

  const getRiskLevel = (level) => {
    switch (level) {
      case 'low':
        return { color: 'text-green-600', bg: 'bg-green-100', label: 'Low Risk' };
      case 'medium':
        return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Medium Risk' };
      case 'high':
        return { color: 'text-red-600', bg: 'bg-red-100', label: 'High Risk' };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Not Assessed' };
    }
  };

  const calculateOverallRisk = () => {
    const riskValues = Object.values(riskData);
    const riskScores = riskValues.map(risk => {
      switch (risk) {
        case 'low': return 1;
        case 'medium': return 2;
        case 'high': return 3;
        default: return 0;
      }
    });
    const avgScore = riskScores.reduce((sum, score) => sum + score, 0) / riskScores.length;
    
    if (avgScore <= 1.5) return 'low';
    if (avgScore <= 2.5) return 'medium';
    return 'high';
  };

  const overallRisk = calculateOverallRisk();
  const overallRiskInfo = getRiskLevel(overallRisk);

  const mitigationStrategies = {
    marketRisk: [
      'Diversify product portfolio',
      'Conduct regular market research',
      'Develop flexible pricing strategies',
      'Build strong brand presence'
    ],
    supplyChainRisk: [
      'Establish multiple supplier relationships',
      'Implement contract farming',
      'Maintain strategic inventory reserves',
      'Develop local supplier networks'
    ],
    currencyRisk: [
      'Use foreign exchange hedging',
      'Price products in stable currencies',
      'Implement cost-plus pricing models',
      'Monitor exchange rate trends'
    ],
    operationalRisk: [
      'Implement preventive maintenance',
      'Train staff on quality procedures',
      'Establish backup systems',
      'Regular equipment upgrades'
    ],
    regulatoryRisk: [
      'Stay updated on regulations',
      'Maintain compliance documentation',
      'Engage with regulatory bodies',
      'Implement quality standards'
    ],
    financialRisk: [
      'Maintain adequate cash reserves',
      'Diversify revenue streams',
      'Monitor financial ratios',
      'Establish credit facilities'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-yellow-100 rounded-full">
            <Shield className="h-8 w-8 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Risk Assessment & Management</h2>
            <p className="text-gray-600">Module 7: Comprehensive risk analysis and mitigation strategies</p>
          </div>
        </div>

        {/* Overall Risk Summary */}
        <div className={`${overallRiskInfo.bg} rounded-lg p-6 mb-8`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Overall Risk Assessment</h3>
              <p className={`text-2xl font-bold ${overallRiskInfo.color}`}>
                {overallRiskInfo.label}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Risk Score</p>
              <p className="text-3xl font-bold text-gray-900">
                {(Object.values(riskData).reduce((sum, risk) => {
                  switch (risk) {
                    case 'low': return sum + 1;
                    case 'medium': return sum + 2;
                    case 'high': return sum + 3;
                    default: return sum;
                  }
                }, 0) / Object.values(riskData).length).toFixed(1)}/3.0
              </p>
            </div>
          </div>
        </div>

        {/* Risk Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {riskTypes.map((risk) => {
            const Icon = risk.icon;
            const currentRisk = getRiskLevel(riskData[risk.id]);
            
            return (
              <div key={risk.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 bg-${risk.color}-100 rounded-lg`}>
                    <Icon className={`h-6 w-6 text-${risk.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{risk.name}</h3>
                    <p className="text-xs text-gray-600">{risk.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className={`text-sm font-medium ${currentRisk.color} mb-2`}>
                    Current Level: {currentRisk.label}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Risk Level</label>
                  <div className="flex gap-2">
                    {['low', 'medium', 'high'].map((level) => (
                      <button
                        key={level}
                        onClick={() => handleRiskChange(risk.id, level)}
                        className={`flex-1 py-2 px-3 text-xs rounded-lg border transition-all ${
                          riskData[risk.id] === level
                            ? level === 'low' ? 'bg-green-500 text-white border-green-500'
                            : level === 'medium' ? 'bg-yellow-500 text-white border-yellow-500'
                            : 'bg-red-500 text-white border-red-500'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mitigation Strategies */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-6">Risk Mitigation Strategies</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {riskTypes.map((risk) => (
              <div key={risk.id} className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3">{risk.name}</h4>
                <ul className="space-y-2">
                  {mitigationStrategies[risk.id].map((strategy, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Monitoring Plan */}
        <div className="mt-8 bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Risk Monitoring Plan</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-green-900 mb-2">Daily Monitoring</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Production quality checks</li>
                <li>• Equipment performance</li>
                <li>• Supply chain status</li>
                <li>• Financial transactions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-900 mb-2">Weekly Reviews</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Market price analysis</li>
                <li>• Supplier performance</li>
                <li>• Operational efficiency</li>
                <li>• Regulatory updates</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-900 mb-2">Monthly Assessment</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Overall risk profile</li>
                <li>• Strategy effectiveness</li>
                <li>• Risk tolerance review</li>
                <li>• Mitigation plan updates</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
            Save Risk Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;