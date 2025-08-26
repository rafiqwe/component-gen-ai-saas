import React from "react";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

const DashboardHome = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold">Welcome back, Rabbi 👋</h1>
        <p className="text-sm opacity-90">Here’s what’s happening today in your dashboard.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-white rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">Revenue</h2>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold mt-2">$12,430</p>
          <span className="text-sm text-green-600">+12% this month</span>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">New Users</h2>
            <Users className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold mt-2">1,245</p>
          <span className="text-sm text-indigo-600">+320 this week</span>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">Growth</h2>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold mt-2">18%</p>
          <span className="text-sm text-purple-600">Steady increase</span>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">Activity</h2>
            <Activity className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold mt-2">76</p>
          <span className="text-sm text-orange-600">Tasks completed</span>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li>✅ User <span className="font-medium">John Doe</span> upgraded to Pro plan</li>
          <li>📊 Monthly report generated successfully</li>
          <li>🆕 New feature <span className="font-medium">Dark Mode</span> released</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
