import React, { useState } from 'react';
import { DollarSign, MapPin, Home, Calculator } from 'lucide-react';

const InvestmentPlanning = () => {
  const [formData, setFormData] = useState({
    availableCapital: '',
    landStatus: 'yes',
    landSize: '',
    factoryLocation: ''
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateInvestment = () => {
    const capital = parseFloat(formData.availableCapital) || 0;
    const landStatus = formData.landStatus;
    const landSize = parseFloat(formData.landSize) || 1;

    // Equipment costs for 1000kg/day capacity
    const equipmentCosts = {
      washingMachine: 2500000,
      slicingMachine: 1800000,
      dryingSystem: 8000000,
      grindingMill: 3500000,
      packagingMachine: 2200000,
      generator: 1500000,
      waterSystem: 800000,
      buildingConstruction: 15000000,
      landCost: landStatus === 'no' ? landSize * 5000000 : 0,
      workingCapital: 5000000,
      licensing: 500000
    };

    const totalEquipmentCost = Object.values(equipmentCosts).reduce((a, b) => a + b, 0);
    const staffCost = calculateStaffRequirements();

    const investmentResults = {
      equipmentCosts,
      staffCost,
      totalEquipmentCost,
      capital,
      fundingGap: Math.max(0, totalEquipmentCost - capital)
    };

    setResults(investmentResults);
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
    let breakdown = [];

    for (let role in staff) {
      const count = staff[role];
      const salary = salaries[role];
      totalStaff += count;
      totalMonthlySalary += count * salary;
      breakdown.push({
        role: role.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        count,
        salary: count * salary
      });
    }

    return {
      totalStaff,
      totalMonthlySalary,
      breakdown
    };
  };

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
                Available Capital (₦):
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="availableCapital"
                  value={formData.availableCapital}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your available capital in Naira"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Land Size (plots):
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

            <button 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={calculateInvestment}
            >
              Calculate Investment Requirements
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Investment Analysis Results</h3>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Equipment & Infrastructure Costs:</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Washing Machine:</span>
                      <span>₦{results.equipmentCosts.washingMachine.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Slicing Machine:</span>
                      <span>₦{results.equipmentCosts.slicingMachine.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Drying System:</span>
                      <span>₦{results.equipmentCosts.dryingSystem.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Grinding Mill:</span>
                      <span>₦{results.equipmentCosts.grindingMill.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Packaging Machine:</span>
                      <span>₦{results.equipmentCosts.packagingMachine.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Generator:</span>
                      <span>₦{results.equipmentCosts.generator.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Water System:</span>
                      <span>₦{results.equipmentCosts.waterSystem.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Building Construction:</span>
                      <span>₦{results.equipmentCosts.buildingConstruction.toLocaleString()}</span>
                    </li>
                    {formData.landStatus === 'no' && (
                      <li className="flex justify-between">
                        <span>Land Acquisition ({formData.landSize} plots):</span>
                        <span>₦{results.equipmentCosts.landCost.toLocaleString()}</span>
                      </li>
                    )}
                    <li className="flex justify-between">
                      <span>Working Capital:</span>
                      <span>₦{results.equipmentCosts.workingCapital.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Licensing & Permits:</span>
                      <span>₦{results.equipmentCosts.licensing.toLocaleString()}</span>
                    </li>
                  </ul>

                  <h4 className="font-medium text-gray-900 pt-2">Staffing Requirements:</h4>
                  <ul className="space-y-2">
                    {results.staffCost.breakdown.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.role}: {item.count} person(s)</span>
                        <span>₦{item.salary.toLocaleString()}/month</span>
                      </li>
                    ))}
                    <li className="flex justify-between font-medium pt-2 border-t">
                      <span>Total Staff: {results.staffCost.totalStaff} people</span>
                    </li>
                    <li className="flex justify-between font-medium">
                      <span>Total Monthly Salary: ₦{results.staffCost.totalMonthlySalary.toLocaleString()}</span>
                    </li>
                  </ul>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Investment Required:</span>
                      <span>₦{results.totalEquipmentCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2">
                      <span>Available Capital:</span>
                      <span>₦{results.capital.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2">
                      <span>Funding Gap:</span>
                      <span>₦{results.fundingGap.toLocaleString()}</span>
                    </div>
                    <div className="pt-3">
                      <p className={`font-medium ${results.capital >= results.totalEquipmentCost ? 'text-green-600' : 'text-red-600'}`}>
                        {results.capital >= results.totalEquipmentCost 
                          ? 'Your capital is sufficient to start the business!' 
                          : `You need additional funding of ₦${results.fundingGap.toLocaleString()}. Consider bank loans or investors.`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 h-full flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  Enter your investment details and click "Calculate Investment Requirements" to see the analysis
                </p>
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