import React, { useState } from 'react';
import { Factory, Settings, Ruler, Palette, Play, Pause, RotateCcw } from 'lucide-react';

const FactoryLayoutDesign = () => {
  const [layoutConfig, setLayoutConfig] = useState({
    factoryWidth: 60,
    factoryLength: 80,
    capacity: 1000,
    layoutType: 'u-shape'
  });

  const [generatedLayout, setGeneratedLayout] = useState(null);
  const [showLayout, setShowLayout] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLayoutConfig(prev => ({
      ...prev,
      [name]: name === 'factoryWidth' || name === 'factoryLength' || name === 'capacity' ? Number(value) : value
    }));
  };

  const generateLayout = () => {
    // Generate factory layout based on configuration
    const layout = createFactoryLayout(layoutConfig);
    setGeneratedLayout(layout);
    setShowLayout(true);
  };

  const createFactoryLayout = (config) => {
    const { factoryWidth, factoryLength, capacity, layoutType } = config;
    
    // Equipment specifications based on capacity
    const equipmentSpecs = {
      500: {
        rawStorage: { capacity: '2 tons', size: { w: 8, h: 6 }, power: 'N/A', throughput: 'N/A' },
        washer: { capacity: '100 kg/hr', size: { w: 4, h: 3 }, power: '2 kW', throughput: '100 kg/hr' },
        slicer: { capacity: '80 kg/hr', size: { w: 3, h: 2 }, power: '3 kW', throughput: '80 kg/hr' },
        blancher: { capacity: '90 kg/hr', size: { w: 5, h: 3 }, power: '15 kW', throughput: '90 kg/hr' },
        dryer: { capacity: '60 kg/hr', size: { w: 8, h: 4 }, power: '25 kW', throughput: '60 kg/hr' },
        mill: { capacity: '100 kg/hr', size: { w: 4, h: 3 }, power: '8 kW', throughput: '100 kg/hr' },
        sieve: { capacity: '120 kg/hr', size: { w: 3, h: 2 }, power: '2 kW', throughput: '120 kg/hr' },
        packaging: { capacity: '150 kg/hr', size: { w: 6, h: 4 }, power: '3 kW', throughput: '150 kg/hr' }
      },
      1000: {
        rawStorage: { capacity: '4 tons', size: { w: 10, h: 8 }, power: 'N/A', throughput: 'N/A' },
        washer: { capacity: '200 kg/hr', size: { w: 6, h: 4 }, power: '4 kW', throughput: '200 kg/hr' },
        slicer: { capacity: '150 kg/hr', size: { w: 4, h: 3 }, power: '5 kW', throughput: '150 kg/hr' },
        blancher: { capacity: '180 kg/hr', size: { w: 7, h: 4 }, power: '30 kW', throughput: '180 kg/hr' },
        dryer: { capacity: '120 kg/hr', size: { w: 12, h: 6 }, power: '45 kW', throughput: '120 kg/hr' },
        mill: { capacity: '200 kg/hr', size: { w: 5, h: 4 }, power: '15 kW', throughput: '200 kg/hr' },
        sieve: { capacity: '250 kg/hr', size: { w: 4, h: 3 }, power: '3 kW', throughput: '250 kg/hr' },
        packaging: { capacity: '300 kg/hr', size: { w: 8, h: 5 }, power: '5 kW', throughput: '300 kg/hr' }
      },
      2000: {
        rawStorage: { capacity: '8 tons', size: { w: 12, h: 10 }, power: 'N/A', throughput: 'N/A' },
        washer: { capacity: '400 kg/hr', size: { w: 8, h: 5 }, power: '8 kW', throughput: '400 kg/hr' },
        slicer: { capacity: '300 kg/hr', size: { w: 5, h: 4 }, power: '10 kW', throughput: '300 kg/hr' },
        blancher: { capacity: '350 kg/hr', size: { w: 10, h: 5 }, power: '60 kW', throughput: '350 kg/hr' },
        dryer: { capacity: '250 kg/hr', size: { w: 15, h: 8 }, power: '90 kW', throughput: '250 kg/hr' },
        mill: { capacity: '400 kg/hr', size: { w: 6, h: 5 }, power: '25 kW', throughput: '400 kg/hr' },
        sieve: { capacity: '500 kg/hr', size: { w: 5, h: 4 }, power: '5 kW', throughput: '500 kg/hr' },
        packaging: { capacity: '600 kg/hr', size: { w: 10, h: 6 }, power: '8 kW', throughput: '600 kg/hr' }
      },
      5000: {
        rawStorage: { capacity: '20 tons', size: { w: 15, h: 12 }, power: 'N/A', throughput: 'N/A' },
        washer: { capacity: '1000 kg/hr', size: { w: 10, h: 6 }, power: '15 kW', throughput: '1000 kg/hr' },
        slicer: { capacity: '750 kg/hr', size: { w: 6, h: 5 }, power: '20 kW', throughput: '750 kg/hr' },
        blancher: { capacity: '850 kg/hr', size: { w: 12, h: 6 }, power: '120 kW', throughput: '850 kg/hr' },
        dryer: { capacity: '600 kg/hr', size: { w: 18, h: 10 }, power: '180 kW', throughput: '600 kg/hr' },
        mill: { capacity: '1000 kg/hr', size: { w: 8, h: 6 }, power: '50 kW', throughput: '1000 kg/hr' },
        sieve: { capacity: '1200 kg/hr', size: { w: 6, h: 5 }, power: '10 kW', throughput: '1200 kg/hr' },
        packaging: { capacity: '1500 kg/hr', size: { w: 12, h: 8 }, power: '15 kW', throughput: '1500 kg/hr' }
      }
    };

    // Select equipment specs based on capacity
    const specs = equipmentSpecs[capacity] || equipmentSpecs[1000];

    // Generate layout based on type
    if (layoutType === 'u-shape') {
      return generateUShapeLayout(specs, factoryWidth, factoryLength);
    } else if (layoutType === 'linear') {
      return generateLinearLayout(specs, factoryWidth, factoryLength);
    } else {
      return generateCellularLayout(specs, factoryWidth, factoryLength);
    }
  };

  const generateUShapeLayout = (specs, factoryWidth, factoryLength) => {
    return [
      { 
        name: 'Raw Material Storage', 
        x: 5, y: 5, 
        width: specs.rawStorage.size.w, 
        height: specs.rawStorage.size.h,
        type: 'storage',
        specs: specs.rawStorage
      },
      { 
        name: 'Washing Station', 
        x: 5, y: 15, 
        width: specs.washer.size.w, 
        height: specs.washer.size.h,
        type: 'processing',
        specs: specs.washer
      },
      { 
        name: 'Slicing Machine', 
        x: 5, y: 25, 
        width: specs.slicer.size.w, 
        height: specs.slicer.size.h,
        type: 'processing',
        specs: specs.slicer
      },
      { 
        name: 'Blanching Unit', 
        x: 5, y: 35, 
        width: specs.blancher.size.w, 
        height: specs.blancher.size.h,
        type: 'processing',
        specs: specs.blancher
      },
      { 
        name: 'Drying Unit', 
        x: 15, y: 35, 
        width: specs.dryer.size.w, 
        height: specs.dryer.size.h,
        type: 'processing',
        specs: specs.dryer
      },
      { 
        name: 'Milling Machine', 
        x: 30, y: 35, 
        width: specs.mill.size.w, 
        height: specs.mill.size.h,
        type: 'processing',
        specs: specs.mill
      },
      { 
        name: 'Sieving Unit', 
        x: 40, y: 35, 
        width: specs.sieve.size.w, 
        height: specs.sieve.size.h,
        type: 'processing',
        specs: specs.sieve
      },
      { 
        name: 'Packaging Station', 
        x: 40, y: 25, 
        width: specs.packaging.size.w, 
        height: specs.packaging.size.h,
        type: 'processing',
        specs: specs.packaging
      },
      { 
        name: 'Finished Goods Storage', 
        x: 40, y: 15, 
        width: 10, height: 8,
        type: 'storage',
        specs: { capacity: '5 tons', power: 'N/A' }
      },
      { 
        name: 'Quality Control Lab', 
        x: 40, y: 5, 
        width: 8, height: 6,
        type: 'quality',
        specs: { capacity: '50 samples/day', power: '5 kW' }
      },
      { 
        name: 'Office', 
        x: 20, y: 5, 
        width: 8, height: 6,
        type: 'admin',
        specs: { capacity: '10 persons', power: '3 kW' }
      },
      { 
        name: 'Generator House', 
        x: 52, y: 5, 
        width: 6, height: 4,
        type: 'utility',
        specs: { capacity: '500 kVA', power: 'Generator' }
      },
      { 
        name: 'Water Treatment', 
        x: 52, y: 15, 
        width: 6, height: 4,
        type: 'utility',
        specs: { capacity: '10,000L/day', power: '8 kW' }
      },
      { 
        name: 'Washroom', 
        x: 30, y: 5, 
        width: 4, height: 4,
        type: 'facility',
        specs: { capacity: '6 persons', power: '2 kW' }
      },
      { 
        name: 'Electrical Room', 
        x: 52, y: 25, 
        width: 4, height: 4,
        type: 'utility',
        specs: { capacity: '800A Panel', power: 'Distribution' }
      },
      { 
        name: 'Maintenance Workshop', 
        x: 15, y: 5, 
        width: 6, height: 4,
        type: 'maintenance',
        specs: { capacity: 'Tools & Spare Parts', power: '5 kW' }
      }
    ];
  };

  const generateLinearLayout = (specs, factoryWidth, factoryLength) => {
    return [
      { 
        name: 'Raw Material Storage', 
        x: 5, y: 5, 
        width: specs.rawStorage.size.w, 
        height: specs.rawStorage.size.h,
        type: 'storage',
        specs: specs.rawStorage
      },
      { 
        name: 'Washing Station', 
        x: 15, y: 5, 
        width: specs.washer.size.w, 
        height: specs.washer.size.h,
        type: 'processing',
        specs: specs.washer
      },
      { 
        name: 'Slicing Machine', 
        x: 25, y: 5, 
        width: specs.slicer.size.w, 
        height: specs.slicer.size.h,
        type: 'processing',
        specs: specs.slicer
      },
      { 
        name: 'Blanching Unit', 
        x: 35, y: 5, 
        width: specs.blancher.size.w, 
        height: specs.blancher.size.h,
        type: 'processing',
        specs: specs.blancher
      },
      { 
        name: 'Drying Unit', 
        x: 45, y: 5, 
        width: specs.dryer.size.w, 
        height: specs.dryer.size.h,
        type: 'processing',
        specs: specs.dryer
      },
      { 
        name: 'Milling Machine', 
        x: 55, y: 5, 
        width: specs.mill.size.w, 
        height: specs.mill.size.h,
        type: 'processing',
        specs: specs.mill
      },
      { 
        name: 'Sieving Unit', 
        x: 65, y: 5, 
        width: specs.sieve.size.w, 
        height: specs.sieve.size.h,
        type: 'processing',
        specs: specs.sieve
      },
      { 
        name: 'Packaging Station', 
        x: 75, y: 5, 
        width: specs.packaging.size.w, 
        height: specs.packaging.size.h,
        type: 'processing',
        specs: specs.packaging
      },
      { 
        name: 'Finished Goods Storage', 
        x: 85, y: 5, 
        width: 10, height: 8,
        type: 'storage',
        specs: { capacity: '5 tons', power: 'N/A' }
      },
      { 
        name: 'Quality Control Lab', 
        x: 5, y: 20, 
        width: 8, height: 6,
        type: 'quality',
        specs: { capacity: '50 samples/day', power: '5 kW' }
      },
      { 
        name: 'Office', 
        x: 15, y: 20, 
        width: 8, height: 6,
        type: 'admin',
        specs: { capacity: '10 persons', power: '3 kW' }
      },
      { 
        name: 'Generator House', 
        x: 25, y: 20, 
        width: 6, height: 4,
        type: 'utility',
        specs: { capacity: '500 kVA', power: 'Generator' }
      },
      { 
        name: 'Water Treatment', 
        x: 35, y: 20, 
        width: 6, height: 4,
        type: 'utility',
        specs: { capacity: '10,000L/day', power: '8 kW' }
      },
      { 
        name: 'Washroom', 
        x: 45, y: 20, 
        width: 4, height: 4,
        type: 'facility',
        specs: { capacity: '6 persons', power: '2 kW' }
      },
      { 
        name: 'Electrical Room', 
        x: 52, y: 20, 
        width: 4, height: 4,
        type: 'utility',
        specs: { capacity: '800A Panel', power: 'Distribution' }
      },
      { 
        name: 'Maintenance Workshop', 
        x: 60, y: 20, 
        width: 6, height: 4,
        type: 'maintenance',
        specs: { capacity: 'Tools & Spare Parts', power: '5 kW' }
      }
    ];
  };

  const generateCellularLayout = (specs, factoryWidth, factoryLength) => {
    return [
      { 
        name: 'Raw Material Storage', 
        x: 5, y: 5, 
        width: specs.rawStorage.size.w, 
        height: specs.rawStorage.size.h,
        type: 'storage',
        specs: specs.rawStorage
      },
      { 
        name: 'Washing Station', 
        x: 5, y: 15, 
        width: specs.washer.size.w, 
        height: specs.washer.size.h,
        type: 'processing',
        specs: specs.washer
      },
      { 
        name: 'Slicing Machine', 
        x: 5, y: 25, 
        width: specs.slicer.size.w, 
        height: specs.slicer.size.h,
        type: 'processing',
        specs: specs.slicer
      },
      { 
        name: 'Blanching Unit', 
        x: 15, y: 15, 
        width: specs.blancher.size.w, 
        height: specs.blancher.size.h,
        type: 'processing',
        specs: specs.blancher
      },
      { 
        name: 'Drying Unit', 
        x: 25, y: 15, 
        width: specs.dryer.size.w, 
        height: specs.dryer.size.h,
        type: 'processing',
        specs: specs.dryer
      },
      { 
        name: 'Milling Machine', 
        x: 35, y: 15, 
        width: specs.mill.size.w, 
        height: specs.mill.size.h,
        type: 'processing',
        specs: specs.mill
      },
      { 
        name: 'Sieving Unit', 
        x: 45, y: 15, 
        width: specs.sieve.size.w, 
        height: specs.sieve.size.h,
        type: 'processing',
        specs: specs.sieve
      },
      { 
        name: 'Packaging Station', 
        x: 55, y: 15, 
        width: specs.packaging.size.w, 
        height: specs.packaging.size.h,
        type: 'processing',
        specs: specs.packaging
      },
      { 
        name: 'Finished Goods Storage', 
        x: 65, y: 15, 
        width: 10, height: 8,
        type: 'storage',
        specs: { capacity: '5 tons', power: 'N/A' }
      },
      { 
        name: 'Quality Control Lab', 
        x: 5, y: 35, 
        width: 8, height: 6,
        type: 'quality',
        specs: { capacity: '50 samples/day', power: '5 kW' }
      },
      { 
        name: 'Office', 
        x: 15, y: 35, 
        width: 8, height: 6,
        type: 'admin',
        specs: { capacity: '10 persons', power: '3 kW' }
      },
      { 
        name: 'Generator House', 
        x: 25, y: 35, 
        width: 6, height: 4,
        type: 'utility',
        specs: { capacity: '500 kVA', power: 'Generator' }
      },
      { 
        name: 'Water Treatment', 
        x: 35, y: 35, 
        width: 6, height: 4,
        type: 'utility',
        specs: { capacity: '10,000L/day', power: '8 kW' }
      },
      { 
        name: 'Washroom', 
        x: 45, y: 35, 
        width: 4, height: 4,
        type: 'facility',
        specs: { capacity: '6 persons', power: '2 kW' }
      },
      { 
        name: 'Electrical Room', 
        x: 52, y: 35, 
        width: 4, height: 4,
        type: 'utility',
        specs: { capacity: '800A Panel', power: 'Distribution' }
      },
      { 
        name: 'Maintenance Workshop', 
        x: 60, y: 35, 
        width: 6, height: 4,
        type: 'maintenance',
        specs: { capacity: 'Tools & Spare Parts', power: '5 kW' }
      }
    ];
  };

  // Plantain flour production process steps
  const processSteps = [
    { id: 1, name: 'Raw Material Reception', description: 'Fresh plantains received and inspected for quality' },
    { id: 2, name: 'Cleaning & Washing', description: 'Remove dirt, debris and sanitize plantains' },
    { id: 3, name: 'Peeling', description: 'Mechanical peeling of plantain skins' },
    { id: 4, name: 'Slicing', description: 'Cut plantains into uniform slices for processing' },
    { id: 5, name: 'Blanching', description: 'Heat treatment to inactivate enzymes and improve texture' },
    { id: 6, name: 'Drying', description: 'Remove moisture content to prevent spoilage' },
    { id: 7, name: 'Milling', description: 'Grind dried plantain chips into fine flour' },
    { id: 8, name: 'Sieving', description: 'Separate flour by particle size for uniformity' },
    { id: 9, name: 'Packaging', description: 'Weigh, seal and label final flour product' },
    { id: 10, name: 'Quality Control', description: 'Test for moisture, microbial content and specifications' },
    { id: 11, name: 'Storage', description: 'Store finished product in controlled environment' }
  ];

  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true);
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % (processSteps.length + 1);
      setAnimationStep(step);
      if (step === processSteps.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 1000);
  };

  const resetAnimation = () => {
    setAnimationStep(0);
    setIsAnimating(false);
  };

  const toggleLayoutView = () => {
    setShowLayout(!showLayout);
  };

  // Auto-generate layout on initial load
  React.useEffect(() => {
    generateLayout();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-full">
            <Factory className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Plantain Flour Production Flowchart</h2>
            <p className="text-gray-600">Module 3: Visualization of the plantain flour production process</p>
          </div>
        </div>

        {/* Animation Controls */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <button 
            onClick={startAnimation}
            disabled={isAnimating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            {isAnimating ? 'Animating...' : 'Start Animation'}
          </button>
          
          <button 
            onClick={resetAnimation}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          
          <div className="text-sm text-gray-600">
            Current step: {animationStep > 0 ? processSteps[animationStep - 1].name : 'Not started'}
          </div>
        </div>

        {/* Factory Layout Visualization Toggle */}
        {generatedLayout && (
          <div className="mb-6">
            <button 
              onClick={toggleLayoutView}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Ruler className="h-4 w-4" />
              {showLayout ? 'Hide Factory Layout' : 'Show Factory Layout'}
            </button>
          </div>
        )}

        {/* Factory Layout Visualization */}
        {showLayout && generatedLayout && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Factory Layout Design</h3>
            <div className="relative border-2 border-gray-300 rounded-lg bg-white p-4" style={{ height: '500px' }}>
              {/* Factory Floor */}
              <div 
                className="relative bg-gray-100 border border-gray-400 rounded"
                style={{ 
                  width: '100%', 
                  height: '100%',
                  backgroundImage: 'repeating-linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), repeating-linear-gradient(45deg, #f0f0f0 25%, #e0e0e0 25%, #e0e0e0 75%, #f0f0f0 75%, #f0f0f0)',
                  backgroundPosition: '0 0, 10px 10px',
                  backgroundSize: '20px 20px'
                }}
              >
                {/* Equipment Items */}
                {generatedLayout.map((item, index) => {
                  // Calculate position as percentage of factory dimensions
                  const xPos = (item.x / 70) * 100;
                  const yPos = (item.y / 50) * 100;
                  const widthPercent = (item.width / 70) * 100;
                  const heightPercent = (item.height / 50) * 100;
                  
                  // Color coding based on equipment type
                  const typeColors = {
                    'storage': 'bg-amber-200 border-amber-400',
                    'processing': 'bg-blue-200 border-blue-400',
                    'quality': 'bg-green-200 border-green-400',
                    'admin': 'bg-purple-200 border-purple-400',
                    'utility': 'bg-red-200 border-red-400',
                    'facility': 'bg-teal-200 border-teal-400',
                    'maintenance': 'bg-yellow-200 border-yellow-400'
                  };
                  
                  return (
                    <div
                      key={index}
                      className={`absolute border-2 rounded flex flex-col justify-between p-2 text-xs cursor-pointer hover:shadow-lg transition-shadow ${typeColors[item.type] || 'bg-gray-200 border-gray-400'}`}
                      style={{
                        left: `${xPos}%`,
                        top: `${yPos}%`,
                        width: `${widthPercent}%`,
                        height: `${heightPercent}%`,
                        minWidth: '60px',
                        minHeight: '40px'
                      }}
                    >
                      <div className="font-bold text-center truncate">{item.name}</div>
                      <div className="text-center text-xs mt-1">
                        {item.specs.capacity || item.specs.throughput || 'N/A'}
                      </div>
                    </div>
                  );
                })}
                
                {/* Legend */}
                <div className="absolute bottom-2 left-2 bg-white p-2 rounded border text-xs">
                  <div className="font-bold mb-1">Legend:</div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-amber-200 border border-amber-400 rounded"></div>
                      <span>Storage</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-200 border border-blue-400 rounded"></div>
                      <span>Processing</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-200 border border-green-400 rounded"></div>
                      <span>Quality</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-purple-200 border border-purple-400 rounded"></div>
                      <span>Admin</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-200 border border-red-400 rounded"></div>
                      <span>Utility</span>
                    </div>
                  </div>
                </div>
                
                {/* Factory Dimensions */}
                <div className="absolute top-2 right-2 bg-white p-2 rounded border text-xs">
                  <div>Factory: {layoutConfig.factoryWidth}m × {layoutConfig.factoryLength}m</div>
                  <div>Capacity: {layoutConfig.capacity} kg/day</div>
                  <div>Layout: {layoutConfig.layoutType}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flowchart Visualization */}
        {!showLayout && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8 overflow-x-auto">
            <div className="min-w-max">
              <div className="relative" style={{ minHeight: '800px', minWidth: '800px' }}>
                {/* Process Steps - Vertical Zigzag Layout */}
                {processSteps.map((step, index) => {
                  // Calculate position with zigzag pattern
                  const isLeftSide = index % 2 === 0;
                  const xPos = isLeftSide ? 100 : 500;
                  const yPos = index * 80; // Increased spacing as per user preference
                  
                  return (
                    <div 
                      key={step.id}
                      className={`absolute transition-all duration-500 ${
                        animationStep === index + 1 
                          ? 'bg-blue-100 border-2 border-blue-500 shadow-lg transform scale-105' 
                          : 'bg-white border border-gray-300'
                      }`}
                      style={{
                        left: `${xPos}px`,
                        top: `${yPos}px`,
                        width: '250px',
                        minHeight: '100px',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          animationStep === index + 1 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {step.id}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{step.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Connection Lines with Zigzag Pattern */}
                {processSteps.slice(0, -1).map((step, index) => {
                  const isLeftSide = index % 2 === 0;
                  const nextIsLeftSide = (index + 1) % 2 === 0;
                  
                  // Determine connection pattern for proper zigzag alternating connections
                  let pathData;
                  if (index === 0) {
                    // First connection: left to right
                    pathData = `
                      M 350 ${index * 80 + 50}
                      L 500 ${index * 80 + 50}
                      L 500 ${(index + 1) * 80 + 50}
                    `;
                  } else if (index % 2 === 1) {
                    // Odd indices: right to left connection
                    pathData = `
                      M 500 ${index * 80 + 50}
                      L 350 ${index * 80 + 50}
                      L 350 ${(index + 1) * 80 + 50}
                    `;
                  } else {
                    // Even indices (except first): left to right connection
                    pathData = `
                      M 350 ${index * 80 + 50}
                      L 500 ${index * 80 + 50}
                      L 500 ${(index + 1) * 80 + 50}
                    `;
                  }
                  
                  return (
                    <svg 
                      key={`line-${step.id}`} 
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                      style={{ zIndex: 1 }}
                    >
                      <path
                        d={pathData}
                        stroke={animationStep > index + 1 ? "#3b82f6" : "#9ca3af"}
                        strokeWidth="3"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        className="transition-colors duration-300"
                      />
                    </svg>
                  );
                })}
                
                {/* Arrowhead Definition */}
                <svg className="absolute top-0 left-0 w-0 h-0">
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="#9ca3af"
                      />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Configuration Panel */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Factory Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Factory Width (meters):
                  </label>
                  <input
                    type="number"
                    name="factoryWidth"
                    value={layoutConfig.factoryWidth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Default: 60m"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Factory Length (meters):
                  </label>
                  <input
                    type="number"
                    name="factoryLength"
                    value={layoutConfig.factoryLength}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Default: 80m"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Capacity (kg/day):
                  </label>
                  <select
                    name="capacity"
                    value={layoutConfig.capacity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={500}>500 kg/day</option>
                    <option value={1000}>1,000 kg/day</option>
                    <option value={2000}>2,000 kg/day</option>
                    <option value={5000}>5,000 kg/day</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Layout Type:
                  </label>
                  <select
                    name="layoutType"
                    value={layoutConfig.layoutType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="u-shape">U-Shape Layout</option>
                    <option value="linear">Linear Layout</option>
                    <option value="cellular">Cellular Layout</option>
                  </select>
                </div>

                <button 
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  onClick={generateLayout}
                >
                  <Settings className="h-5 w-5" />
                  Generate Factory Layout
                </button>
              </div>
            </div>
          </div>

          {/* Process Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Process Information</h3>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h4 className="font-medium text-gray-900 mb-3">Plantain Flour Production Overview</h4>
              <p className="text-sm text-gray-600 mb-4">
                The plantain flour production process involves 11 key steps, transforming raw plantains 
                into a high-quality flour product suitable for various food applications.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Preparation stages (1-4)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Processing stages (5-7)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Finishing stages (8-11)</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-2">Key Specifications</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Final moisture content: &lt;12%</li>
                <li>• Particle size: 100-200 mesh</li>
                <li>• Shelf life: 12-18 months</li>
                <li>• Yield: ~30% of fresh plantain weight</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Equipment Specifications */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Equipment Specifications
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900">Raw Material Storage</h4>
              <p className="text-sm text-blue-700 mt-1">Capacity: {layoutConfig.capacity >= 2000 ? '8 tons' : layoutConfig.capacity >= 1000 ? '4 tons' : '2 tons'}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900">Processing Units</h4>
              <p className="text-sm text-green-700 mt-1">Throughput: {layoutConfig.capacity} kg/day</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900">Packaging Station</h4>
              <p className="text-sm text-purple-700 mt-1">Speed: {layoutConfig.capacity >= 2000 ? '600' : layoutConfig.capacity >= 1000 ? '300' : '150'} kg/hr</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium text-amber-900">Utilities</h4>
              <p className="text-sm text-amber-700 mt-1">Power: {layoutConfig.capacity >= 2000 ? '500' : layoutConfig.capacity >= 1000 ? '300' : '150'} kW</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Factory Layout Design
          </button>
        </div>
      </div>
    </div>
  );
};

export default FactoryLayoutDesign;