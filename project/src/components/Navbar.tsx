import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Code, History, Settings, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-xl font-bold">NeuraLint</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                  <div className="flex items-center">
                    <Code className="h-4 w-4 mr-1" />
                    Code Analysis
                  </div>
                </Link>
                <Link to="/history" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                  <div className="flex items-center">
                    <History className="h-4 w-4 mr-1" />
                    History
                  </div>
                </Link>
                <Link to="/settings" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-1" />
                    Settings
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <div className="flex items-center">
                  <span className="mr-2 text-sm">John Doe</span>
                  <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;