import React from 'react';
import Link from 'next/link';
import { Home, Menu, Search, Star } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-black/90 backdrop-blur-md text-white p-4 border-b border-gray-800">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Menu className="w-6 h-6 text-blue-400 hover:text-white transition-colors" />
          <Link href="/" className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Aryaman Mishra
          </Link>
        </div>

        {/* Center */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-900/60 backdrop-blur-sm rounded-lg py-2 px-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-900/80 transition-all border border-gray-700"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-blue-400" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-800/60 rounded-full transition-all hover:scale-105">
            <Star className="w-6 h-6 text-blue-400 hover:text-yellow-400" />
          </button>
          <button className="p-2 hover:bg-gray-800/60 rounded-full transition-all hover:scale-105">
            <Home className="w-6 h-6 text-blue-400 hover:text-white" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

