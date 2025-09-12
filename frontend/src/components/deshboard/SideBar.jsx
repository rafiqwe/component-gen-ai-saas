import {
  X,
  LayoutDashboard,
  Code2,
  Settings,
  CreditCard,
  Box,
  User2,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    link: "/genAi",
  },
  {
    name: "Generate Component",
    icon: <Code2 size={18} />,
    link: "/genAi/component-generator",
  },
  {
    name: "My Components",
    icon: <Box size={18} />,
    link: "/genAi/my-component",
  },
  { name: "Profile", icon: <User2 size={18} />, link: "/genAi/profile" },
  { name: "Pricing", icon: <CreditCard size={18} />, link: "/genAi/pricing" },
  { name: "Settings", icon: <Settings size={18} />, link: "/genAi/setting" },
];

const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed z-100 inset-y-0 left-0 w-64 transition-all duration-300 transform
        bg-gray-900/90 backdrop-blur-xl border-r border-gray-800 shadow-xl
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-gray-800">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          <Link to={"/"}>GenAi</Link>
        </h1>
        <button
          className="md:hidden text-gray-400 hover:text-gray-200"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={22} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.link;
          return (
            <Link
              key={idx}
              to={item.link}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all font-medium
                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SideBar;
