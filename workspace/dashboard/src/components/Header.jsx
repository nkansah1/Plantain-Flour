import React from 'react';
import { Building2, LogOut, User } from 'lucide-react';

const Header = ({ userData, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">FUTA Plantain Flour Production</h1>
            <p className="text-sm text-gray-600">Business Case Development System</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>{userData?.name || userData?.email}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;