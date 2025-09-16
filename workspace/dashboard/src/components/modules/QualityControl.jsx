import React, { useState } from 'react';
import { CheckCircle, Award, FileCheck, Zap } from 'lucide-react';

const QualityControl = () => {
  const [selectedStandard, setSelectedStandard] = useState('basic');

  const qualityStandards = {
    basic: {
      name: 'Basic Quality (NAFDAC Standard)',
      description: 'Meets Nigerian food safety requirements',
      requirements: [
        'Moisture content ≤ 12%',
        'Microbial count within acceptable limits',
        'Free from foreign matter',
        'Proper labeling and packaging',
        'Shelf life documentation'
      ],
      benefits: [
        'Legal compliance in Nigeria',
        'Basic food safety assurance',
        'Local market acceptance',
        'Cost-effective implementation'
      ],
      cost: 'Low',
      timeline: '2-3 months',
      color: 'blue'
    },
    premium: {
      name: 'Premium Quality (ISO 22000)',
      description: 'International food safety management system',
      requirements: [
        'HACCP implementation',
        'Documented quality management system',
        'Regular internal audits',
        'Staff training programs',
        'Supplier verification',
        'Traceability systems'
      ],
      benefits: [
        'International market access',
        'Enhanced consumer confidence',
        'Systematic risk management',
        'Continuous improvement',
        'Premium pricing opportunities'
      ],
      cost: 'Medium',
      timeline: '6-8 months',
      color: 'green'
    },
    export: {
      name: 'Export Quality (HACCP + Organic)',
      description: 'Highest quality for international export',
      requirements: [
        'Organic certification',
        'HACCP compliance',
        'Third-party audits',
        'Environmental sustainability',
        'Supply chain verification',
        'International standards compliance'
      ],
      benefits: [
        'Access to premium export markets',
        'Higher profit margins',
        'Brand differentiation',
        'Environmental sustainability',
        'Long-term market positioning'
      ],
      cost: 'High',
      timeline: '12-18 months',
      color: 'purple'
    },
    pharmaceutical: {
      name: 'Pharmaceutical Grade',
      description: 'Highest purity for pharmaceutical applications',
      requirements: [
        'GMP (Good Manufacturing Practice)',
        'Pharmaceutical-grade facilities',
        'Extensive testing protocols',
        'Contamination control',
        'Batch documentation',
        'Regulatory approvals'
      ],
      benefits: [
        'Pharmaceutical industry sales',
        'Highest profit margins',
        'Specialized market niche',
        'Regulatory compliance',
        'Premium brand positioning'
      ],
      cost: 'Very High',
      timeline: '18-24 months',
      color: 'red'
    }
  };

  const testingProtocols = [
    { test: 'Moisture Content', frequency: 'Every batch', method: 'Oven drying method', limit: '≤ 12%' },
    { test: 'Particle Size', frequency: 'Daily', method: 'Sieve analysis', limit: '80% pass 100 mesh' },
    { test: 'Microbial Count', frequency: 'Weekly', method: 'Plate count method', limit: '< 10⁴ CFU/g' },
    { test: 'Heavy Metals', frequency: 'Monthly', method: 'ICP-MS analysis', limit: 'Within FDA limits' },
    { test: 'Pesticide Residue', frequency: 'Monthly', method: 'GC-MS analysis', limit: 'Below MRL' },
    { test: 'Nutritional Profile', frequency: 'Quarterly', method: 'AOAC methods', limit: 'Label compliance' }
  ];

  const currentStandard = qualityStandards[selectedStandard];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-teal-100 rounded-full">
            <CheckCircle className="h-8 w-8 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Quality Control</h2>
            <p className="text-gray-600">Module 8: Quality standards and control systems</p>
          </div>
        </div>

        {/* Quality Standard Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Quality Standard</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(qualityStandards).map(([key, standard]) => (
              <button
                key={key}
                onClick={() => setSelectedStandard(key)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedStandard === key
                    ? `border-${standard.color}-500 bg-${standard.color}-50`
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900 mb-2">{standard.name}</div>
                <div className="text-sm text-gray-600 mb-2">{standard.description}</div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Cost: {standard.cost}</span>
                  <span className="text-gray-500">{standard.timeline}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Standard Details */}
        <div className={`bg-${currentStandard.color}-50 rounded-lg p-6 mb-8`}>
          <div className="flex items-center gap-3 mb-4">
            <Award className={`h-6 w-6 text-${currentStandard.color}-600`} />
            <h3 className="text-xl font-bold text-gray-900">{currentStandard.name}</h3>
          </div>
          
          <p className="text-gray-700 mb-6">{currentStandard.description}</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
              <ul className="space-y-2">
                {currentStandard.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className={`h-4 w-4 text-${currentStandard.color}-600 mt-0.5 flex-shrink-0`} />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
              <ul className="space-y-2">
                {currentStandard.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <Zap className={`h-4 w-4 text-${currentStandard.color}-600 mt-0.5 flex-shrink-0`} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Implementation Cost</p>
              <p className={`text-lg font-bold text-${currentStandard.color}-600`}>{currentStandard.cost}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Timeline</p>
              <p className={`text-lg font-bold text-${currentStandard.color}-600`}>{currentStandard.timeline}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Complexity</p>
              <p className={`text-lg font-bold text-${currentStandard.color}-600`}>
                {selectedStandard === 'basic' ? 'Low' : 
                 selectedStandard === 'premium' ? 'Medium' : 
                 selectedStandard === 'export' ? 'High' : 'Very High'}
              </p>
            </div>
          </div>
        </div>

        {/* Testing Protocols */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FileCheck className="h-6 w-6 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Quality Testing Protocols</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Test Parameter
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Frequency
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Method
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Acceptance Limit
                  </th>
                </tr>
              </thead>
              <tbody>
                {testingProtocols.map((protocol, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">
                      {protocol.test}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                      {protocol.frequency}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                      {protocol.method}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                      {protocol.limit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Implementation Roadmap */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-6">Implementation Roadmap</h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="font-semibold text-blue-900 mb-2">Phase 1: Foundation</div>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Staff training</li>
                <li>• Documentation setup</li>
                <li>• Basic equipment</li>
                <li>• Initial testing</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="font-semibold text-blue-900 mb-2">Phase 2: Implementation</div>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• System deployment</li>
                <li>• Process validation</li>
                <li>• Internal audits</li>
                <li>• Corrective actions</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="font-semibold text-blue-900 mb-2">Phase 3: Certification</div>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• External audits</li>
                <li>• Certification process</li>
                <li>• Documentation review</li>
                <li>• Final approval</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="font-semibold text-blue-900 mb-2">Phase 4: Maintenance</div>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Continuous monitoring</li>
                <li>• Regular reviews</li>
                <li>• System updates</li>
                <li>• Re-certification</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            Save Quality Control Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default QualityControl;