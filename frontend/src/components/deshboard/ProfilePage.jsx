import { useState } from "react";
import { motion } from "framer-motion";
import { User, LogOut, Settings, Code, Crown } from "lucide-react";
import ChangePasswordModal from "./ChangePasswordModel";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center  p-4 sm:p-6">
      <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/3 bg-gray-800 p-6 flex flex-col items-center text-center md:text-left">
          <img
            src="https://i.pravatar.cc/150"
            alt="User Avatar"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-28 rounded-full border-4 border-gray-700 mb-4"
          />
          <h2 className="text-lg sm:text-xl font-semibold">Muhammad Rabbi</h2>
          <p className="text-gray-400 text-sm">Full Stack Developer</p>
          <span className="flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs sm:text-sm">
            <Crown size={16} /> Pro Plan
          </span>

          <button className="mt-6 bg-red-500 hover:bg-red-600 w-full py-2 rounded-xl flex items-center justify-center gap-2 transition text-sm sm:text-base">
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-2/3 p-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 border-b border-gray-700 mb-6 justify-center md:justify-start">
            {["overview", "components", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 capitalize text-sm sm:text-base ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Account Overview</h3>
                <p className="text-gray-400 mb-2 text-sm sm:text-base">
                  Email: rabbi@example.com
                </p>
                <p className="text-gray-400 mb-2 text-sm sm:text-base">
                  Subscription: Pro Plan
                </p>
                <p className="text-gray-400 text-sm sm:text-base">
                  API Usage: 120 / 500 this month
                </p>
              </div>
            )}

            {activeTab === "components" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Code size={18} /> My Components
                </h3>
                <ul className="space-y-3 text-sm sm:text-base">
                  <li className="p-3 bg-gray-800 rounded-lg">Card Component</li>
                  <li className="p-3 bg-gray-800 rounded-lg">Login Form</li>
                  <li className="p-3 bg-gray-800 rounded-lg">Profile Page</li>
                </ul>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Settings size={18} /> Settings
                </h3>
                <div className="space-y-3 text-sm sm:text-base">
                  <button className="w-full   bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition">
                    <ChangePasswordModal />
                  </button>
                  <Link
                    to={"/genAi/setting"}
                    className="w-full block cursor-pointer bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
                  >
                    Notification Preferences
                  </Link>
                  <Link
                    to={"/genAi/setting"}
                    className="w-full block  cursor-pointer bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
                  >
                    Toggle Dark/Light Mode
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
