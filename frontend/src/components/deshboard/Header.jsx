import { Menu, Bell } from "lucide-react";
import React from "react";

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="flex items-center fixed top-0 w-full justify-between px-6 h-16 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800 shadow-md z-10">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="w-5 h-5 text-gray-300" />
      </button>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-3 pr-4 py-2 text-sm bg-gray-800/70 border border-gray-700 rounded-xl 
                       text-gray-200 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 md:w-64 transition"
          />
        </div>

        {/* Notification Bell */}
        <button className="p-2 rounded-full hover:bg-gray-800 transition relative">
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow" />
        </button>

        {/* User Avatar */}
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-9 h-9 rounded-full border-2 border-indigo-500/50 hover:scale-105 transition"
        />
      </div>
    </header>
  );
};

export default Header;
