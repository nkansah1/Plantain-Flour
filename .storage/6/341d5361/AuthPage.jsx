import React, { useState } from 'react';
import { Building2, User, LogIn, UserPlus } from 'lucide-react';

const AuthPage = ({ onAuth }) => {
  const [authStep, setAuthStep] = useState('selection'); // 'selection', 'newUser', 'accreditedUser'
  const [formData, setFormData] = useState({});

  const handleUserTypeSelection = (type) => {
    setAuthStep(type);
  };

  const handleNewUserRegistration = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      department: e.target.department.value,
      businessType: e.target.businessType.value,
      phone: e.target.phone.value,
    };
    onAuth('new', data);
  };

  const handleAccreditedUserLogin = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    onAuth('accredited', data);
  };

  if (authStep === 'selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Building2 className="mx-auto h-16 w-16 text-green-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">FUTA</h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Plantain Flour Production
            </h2>
            <p className="text-sm text-gray-600 mb-4">Business Case Development System</p>
            <div className="text-xs text-gray-500 border-t pt-4">
              <p>Federal University of Technology, Akure (FUTA)</p>
              <p>Department of Industrial and Production Engineering</p>
              <p className="mt-2">Prepared by: Abraham Adjei</p>
              <p className="text-red-500">Classification: Intellectual Property Protected</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-center mb-6">Select User Type</h3>
            
            <div className="space-y-4">
              <button
                onClick={() => handleUserTypeSelection('newUser')}
                className="w-full flex items-center justify-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200"
              >
                <UserPlus className="h-6 w-6 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">New User</div>
                  <div className="text-sm text-gray-600">First time registration</div>
                </div>
              </button>

              <button
                onClick={() => handleUserTypeSelection('accreditedUser')}
                className="w-full flex items-center justify-center gap-3 p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
              >
                <LogIn className="h-6 w-6 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Accredited User</div>
                  <div className="text-sm text-gray-600">Existing user login</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (authStep === 'newUser') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <UserPlus className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">New User Registration</h2>
              <p className="text-gray-600">Create your business case development profile</p>
            </div>

            <form onSubmit={handleNewUserRegistration} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department/Organization</label>
                <input
                  type="text"
                  name="department"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your department"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                <select
                  name="businessType"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select business type</option>
                  <option value="startup">Startup</option>
                  <option value="existing">Existing Business</option>
                  <option value="research">Research Project</option>
                  <option value="investment">Investment Analysis</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setAuthStep('selection')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (authStep === 'accreditedUser') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <LogIn className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Accredited User Login</h2>
              <p className="text-gray-600">Access your business case development data</p>
            </div>

            <form onSubmit={handleAccreditedUserLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setAuthStep('selection')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthPage;