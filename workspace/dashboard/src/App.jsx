import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import MainDashboard from './components/MainDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleAuth = (type, data) => {
    setUserType(type);
    setUserData(data);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setUserData(null);
  };

  if (!isAuthenticated) {
    return <AuthPage onAuth={handleAuth} />;
  }

  return (
    <MainDashboard 
      userType={userType} 
      userData={userData} 
      onLogout={handleLogout} 
    />
  );
}

export default App;