import React, { useState } from 'react';
import { GitBranch, Layers, Settings, Zap, Play, RotateCcw } from 'lucide-react';

const SystemFlowchart = () => {
  const [selectedLevel, setSelectedLevel] = useState('plant');
  const [currentStep, setCurrentStep] = useState(1); // For interactive step tracking

  const processSteps = [
    { id: 1, name: 'Raw Material Reception', description: 'Receive and inspect plantains', status: 'completed' },
    { id: 2, name: 'Cleaning & Washing', description: 'Remove dirt and contaminants', status: 'completed' },
    { id: 3, name: 'Peeling', description: 'Remove plantain peels', status: 'active' },
    { id: 4, name: 'Slicing', description: 'Cut into uniform pieces', status: 'pending' },
    { id: 5, name: 'Blanching', description: 'Steam treatment to preserve nutrients', status: 'pending' },
    { id: 6, name: 'Drying/Dehydration', description: 'Remove moisture content', status: 'pending' },
    { id: 7, name: 'Grinding', description: 'Convert to fine flour', status: 'pending' },
    { id: 8, name: 'Sieving', description: 'Ensure uniform particle size', status: 'pending' },
    { id: 9, name: 'Quality Testing', description: 'Check moisture, fineness, purity', status: 'pending' },
    { id: 10, name: 'Packaging', description: 'Package in appropriate containers', status: 'pending' },
    { id: 11, name: 'Labeling & Storage', description: 'Final product preparation', status: 'pending' }
  ];

  const factoryLevels = {
    plant: {
      title: 'Plant Level Analysis',
      description: 'Individual processing equipment and operations',
      items: [
        'Washing Station Optimization',
        'Peeling Machine Efficiency',
        'Drying System Performance',
        'Grinding Mill Capacity',
        'Quality Control Points'
      ]
    },
    factory: {
      title: 'Factory Level Planning',
      description: 'Overall facility management and coordination',
      items: [
        'Production Line Integration',
        'Material Flow Optimization',
        'Waste Management System',
        'Utility Distribution',
        'Safety & Compliance'
      ]
    },
    enterprise: {
      title: 'Enterprise Level Strategy',
      description: 'Business-wide planning and management',
      items: [
        'Supply Chain Management',
        'Market Distribution Strategy',
        'Financial Planning & Control',
        'Human Resource Management',
        'Technology Integration'
      ]
    },
    integrated: {
      title: 'Integrated Business Solution',
      description: 'Holistic approach to business optimization',
      items: [
        'End-to-End Process Automation',
        'Real-time Monitoring Systems',
        'Predictive Maintenance',
        'Customer Relationship Management',
        'Sustainability Initiatives'
      ]
    }
  };

  // Function to get step color based on status
  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-500';
      case 'active': return 'bg-blue-100 border-blue-500';
      case 'pending': return 'bg-gray-100 border-gray-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  // Function to get step circle color
  const getCircleColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white';
      case 'active': return 'bg-blue-500 text-white';
      case 'pending': return 'bg-gray-300 text-gray-600';
      default: return 'bg-gray-300 text-gray-600';
    }
  };

  // Reset to first step
  const resetFlow = () => {
    setCurrentStep(1);
  };

  // Start/restart flow
  const startFlow = () => {
    setCurrentStep(1);
  };

  // Go to specific step
  const goToStep = (stepId) => {
    setCurrentStep(stepId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-full">
            <GitBranch className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">System Flowchart</h2>
            <p className="text-gray-600">Module 6: Process visualization and system analysis</p>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="flex gap-3 mb-6">
          <button 
            onClick={startFlow}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Play className="h-4 w-4" />
            Start
          </button>
          <button 
            onClick={resetFlow}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        {/* Level Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Level</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(factoryLevels).map(([key, level]) => (
              <button
                key={key}
                onClick={() => setSelectedLevel(key)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedLevel === key
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium mb-1">{level.title}</div>
                  <div className="text-xs opacity-75">{level.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Process Flow Diagram - Horizontal Layout with Improved Spacing */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-8">Production Process Flow</h3>
          
          <div className="relative">
            {/* Horizontal flow with increased spacing */}
            <div className="flex flex-wrap gap-20 justify-center"> 
              {processSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className="relative flex flex-col items-center"
                  style={{ marginBottom: '80px' }} // Increased vertical spacing as per preference
                >
                  {/* Step Card with Interactive Elements */}
                  <div 
                    className={`${getStepColor(step.status)} rounded-lg p-6 border-2 hover:border-indigo-300 transition-all cursor-pointer w-48`}
                    onClick={() => goToStep(step.id)}
                  >
                    <div className="flex flex-col items-center">
                      {/* Step Number in Colored Circle */}
                      <div className={`w-10 h-10 ${getCircleColor(step.status)} rounded-full flex items-center justify-center text-sm font-bold mb-3`}>
                        {step.id}
                      </div>
                      <h4 className="font-semibold text-gray-900 text-center mb-2">{step.name}</h4>
                      <p className="text-sm text-gray-600 text-center">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Enhanced Arrow Connectors */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4">
                      <div className="w-8 h-8 border-r-2 border-b-2 border-indigo-600 rotate-45"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Level Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {factoryLevels[selectedLevel].title}
            </h3>
          </div>
          
          <p className="text-gray-600 mb-6">{factoryLevels[selectedLevel].description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Key Focus Areas</h4>
              <ul className="space-y-2">
                {factoryLevels[selectedLevel].items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                {selectedLevel === 'plant' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Equipment Efficiency</span>
                      <span className="font-medium text-green-600">85%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Processing Speed</span>
                      <span className="font-medium text-blue-600">500 kg/hour</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Quality Score</span>
                      <span className="font-medium text-purple-600">92%</span>
                    </div>
                  </>
                )}
                {selectedLevel === 'factory' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Overall Efficiency</span>
                      <span className="font-medium text-green-600">78%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Daily Capacity</span>
                      <span className="font-medium text-blue-600">2,000 kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Waste Reduction</span>
                      <span className="font-medium text-purple-600">15%</span>
                    </div>
                  </>
                )}
                {selectedLevel === 'enterprise' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Market Share</span>
                      <span className="font-medium text-green-600">12%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Revenue Growth</span>
                      <span className="font-medium text-blue-600">+25%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">ROI</span>
                      <span className="font-medium text-purple-600">18%</span>
                    </div>
                  </>
                )}
                {selectedLevel === 'integrated' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Automation Level</span>
                      <span className="font-medium text-green-600">65%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">System Integration</span>
                      <span className="font-medium text-blue-600">80%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sustainability Score</span>
                      <span className="font-medium text-purple-600">75%</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Recommendations */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">Optimization Recommendations</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Process Improvements</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Implement automated conveyor systems</li>
                <li>• Install real-time monitoring sensors</li>
                <li>• Optimize drying temperature profiles</li>
                <li>• Integrate quality control checkpoints</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Technology Integration</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Deploy IoT sensors for data collection</li>
                <li>• Implement predictive maintenance</li>
                <li>• Use AI for quality assessment</li>
                <li>• Integrate ERP system for management</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Export System Flowchart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemFlowchart;