import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import InvestmentPlanning from './modules/InvestmentPlanning';
import BusinessCaseAnalysis from './modules/BusinessCaseAnalysis';
import FactoryLayoutDesign from './modules/FactoryLayoutDesign';
import SupplierManagement from './modules/SupplierManagement';
import ProgressTracking from './modules/ProgressTracking';
import RiskAssessment from './modules/RiskAssessment';
import QualityControl from './modules/QualityControl';
import MarketAnalysis from './modules/MarketAnalysis';
import SystemFlowchart from './modules/SystemFlowchart';
import DashboardOverview from './DashboardOverview';

const MainDashboard = ({ userType, userData, onLogout }) => {
  const [activeModule, setActiveModule] = useState('overview');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'overview':
        return <DashboardOverview userData={userData} />;
      case 'investment':
        return <InvestmentPlanning />;
      case 'business-analysis':
        return <BusinessCaseAnalysis />;
      case 'factory-layout':
        return <FactoryLayoutDesign />;
      case 'supplier-management':
        return <SupplierManagement />;
      case 'progress-tracking':
        return <ProgressTracking />;
      case 'risk-assessment':
        return <RiskAssessment />;
      case 'quality-control':
        return <QualityControl />;
      case 'market-analysis':
        return <MarketAnalysis />;
      case 'system-flowchart':
        return <SystemFlowchart />;
      default:
        return <DashboardOverview userData={userData} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userData={userData} onLogout={onLogout} />
      <div className="flex flex-1">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="flex-1 p-6 overflow-auto">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;